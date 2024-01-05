//
//  Crystal_GoogleApp.swift
//  Crystal Google
//
//  Created by Nicholas Kang on 2/24/23.
//

import SwiftUI
import WebKit
import KeyboardShortcuts
import Cocoa

@main
struct Project_CrystalApp: App {

    @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @StateObject private var hiddenShortcut:HiddenShortcut = HiddenShortcut()
    @StateObject private var transparentShortcut = TransparentShortcut()
    @StateObject private var upOpacityShortcut = UpOpacityShortcut()
    @StateObject private var downOpacityShortcut = DownOpacityShortcut()
    @StateObject private var createNewWindowShortcut = CreateNewWindowShortcut()
    @StateObject private var createNewIncognitoWindowShortcut = CreateNewIncognitoWindowShortcut()
    @StateObject private var stickyShortcut = StickyShortcut()

//
    var body: some Scene {

        return WindowGroup{
            Test()
                .onAppear() {
                    hiddenShortcut.appdelegate = appDelegate
                    transparentShortcut.appdelegate = appDelegate
                    upOpacityShortcut.appdelegate = appDelegate
                    downOpacityShortcut.appdelegate = appDelegate
                    createNewWindowShortcut.appdelegate = appDelegate
                    createNewIncognitoWindowShortcut.appdelegate = appDelegate
                    stickyShortcut.appdelegate = appDelegate
                }
        }.windowStyle(HiddenTitleBarWindowStyle())

    }
}


class AppDelegate: NSObject, NSApplicationDelegate {

    var delegates:[WindowDelegate] = []

    private let popover = NSPopover()
    private var statusItem: NSStatusItem!

    @ObservedObject var settings = Settings()

    private var settingsPopup:SettingsPopup!

    func applicationDidFinishLaunching(_ aNotification: Notification) {

//        NSApplication.shared.presentationOptions.remove(.autoHideMenuBar)

        NSEvent.addGlobalMonitorForEvents(matching: .leftMouseDown) { (event) in
            if event.clickCount == 4 {
                self.toggleTransparency()
            }
        }

        settingsPopup = SettingsPopup(settings: settings, parent: self)

        if let window = NSApplication.shared.windows.first {
            window.close()
        }

        createWindow()

        statusItem = NSStatusBar.system.statusItem(withLength: 24)
        // 3
        if let button = statusItem.button {
            button.image = NSImage(named: "MenuBarIcon")//?.resized(to: NSSize(width: 18, height: 18))
            button.image?.size = NSSize(width: 18, height: 18)
        }

        setup()
        
        NSWorkspace.shared.notificationCenter.addObserver(self, selector: #selector(self.update), name: NSWorkspace.activeSpaceDidChangeNotification, object: nil)

    }

    func createWindow(incognito:Bool = false, initialView: MyWebView? = nil, offset: Int = 0) {

        let windowLevel = 5
        let border = 50
        var windowRect:NSRect

        if let arr = UserDefaults.standard.array(forKey: "windowRect") as? [Int], arr.count == 4 {
            windowRect = NSRect(x: max(arr[0] + offset, 1), y: max(arr[1] - offset, 1), width: max(arr[2], 50), height: max(arr[3], 50))
            UserDefaults.standard.set([windowRect.origin.x, windowRect.origin.y, windowRect.width, windowRect.height], forKey: "windowRect")
        } else {
            windowRect = NSRect(x: border, y: 0, width: (Int(NSScreen.main!.frame.width) - border * 2), height: Int(NSScreen.main!.frame.height) - border * 4)
        }

        let overlayWindow = NSWindow(contentRect: windowRect,
                                     styleMask: [.titled, .miniaturizable, .resizable, .closable, .fullSizeContentView],
                                     backing: .buffered,
                                     defer: false,
                                     screen: NSScreen.main)

        overlayWindow.isReleasedWhenClosed = true
        overlayWindow.level = NSWindow.Level(rawValue: windowLevel)
        overlayWindow.backgroundColor = .white
        overlayWindow.alphaValue = settings.opacity
        overlayWindow.isOpaque = false
        settings.hidden = false
        overlayWindow.ignoresMouseEvents = settings.transparent

        NSApplication.shared.activate(ignoringOtherApps: true)
        overlayWindow.makeKeyAndOrderFront(nil)

        overlayWindow.titlebarAppearsTransparent = true

        if !settings.sticky {
            overlayWindow.collectionBehavior = .canJoinAllSpaces
        }

        let initial:[MyWebView]
        if let i = initialView {
            initial = [i]
        } else {
            initial = []
        }
        
//        UserDefaults.standard.removeObject(forKey: "windowRect")
        
        overlayWindow.appearance = NSAppearance(named: .aqua)

        let navState = NavigationState(window: overlayWindow, incognito: incognito, initialViews: initial)
        let browser = Bowser(navigationState: navState, settings: settings, transparencyOn: settings.transparent, incognito: incognito, parent: self)

        let hosting = NSHostingView(rootView: browser)
        overlayWindow.contentView = hosting
        overlayWindow.hasShadow = settings.shadow

        let clickGesture = NSClickGestureRecognizer(target: self, action: #selector(toggleTransparency))
        clickGesture.numberOfClicksRequired = 4
        clickGesture.buttonMask = 0x1
        clickGesture.delaysPrimaryMouseButtonEvents = false
        overlayWindow.contentView?.addGestureRecognizer(clickGesture)

        let toolbar = NSToolbar()
        overlayWindow.isMovable = false
        overlayWindow.titleVisibility = .hidden
        toolbar.allowsUserCustomization = false
        overlayWindow.toolbarStyle = .unified
        overlayWindow.toolbar = toolbar
        
        let delegate = WindowDelegate(window: overlayWindow, parent: self, navigationState: navState)
        overlayWindow.delegate = delegate
        delegates.append(delegate)
        
        

    }

    
    func transferView(webView:MyWebView, windowNumber: Int?) {
        
        if let num = windowNumber {
            for window in NSApplication.shared.windows {
                if let delegate = window.delegate as? WindowDelegate {
                    if window.windowNumber == num {
                        withAnimation(settings.animations ? .spring() : nil) {
                            delegate.navigationState.webViews.append(webView)
                            
                            webView.addObserver(delegate.navigationState, forKeyPath: #keyPath(WKWebView.canGoBack), options: .new, context: nil)
                            webView.addObserver(delegate.navigationState, forKeyPath: #keyPath(WKWebView.canGoForward), options: .new, context: nil)
                            webView.addObserver(delegate.navigationState, forKeyPath: #keyPath(WKWebView.url), options: .new, context: nil)
                        }
                        delegate.navigationState.selectedWebIndex = delegate.navigationState.webViews.count - 1
                        window.makeKeyAndOrderFront(nil)
                    }
                }
            }
        } else {
            webView.isTransferring = false
            createWindow(initialView: webView, offset: 20)
        }
    }


    @objc func update() {
//        let compareWindows: (NSWindow, NSWindow) -> Bool = { (window1, window2) in
//            return window1.level.rawValue < window2.level.rawValue
//        }
//        let sorted = NSApplication.shared.windows.sorted(by: compareWindows)
        for window in NSApplication.shared.windows {
            if let _ = window.delegate as? WindowDelegate {

                window.hasShadow = settings.shadow
                window.animator().alphaValue = settings.opacity
                window.ignoresMouseEvents = settings.transparent
                window.collectionBehavior = settings.sticky ? NSWindow.CollectionBehavior(rawValue: 0) : .canJoinAllSpaces
                
                // focusing stuff
                if (!settings.sticky || window.isOnActiveSpace) && !window.isMiniaturized {
                    
                    if settings.hidden {
                        window.orderOut(nil)
                    } else {
                        window.orderOut(nil)
                        window.orderFront(nil)
                    }
                    
                    if !settings.hidden && !settings.transparent {
//                        print("autofocused")
                        NSApplication.shared.activate(ignoringOtherApps: true)
                        if !popover.isShown {
                            window.makeKeyAndOrderFront(nil)
                        }
                    } else {
                        if window.isKeyWindow {
                            window.resignKey()
                            window.orderFront(nil)
                        }
//                        print("defocused")
                    }
                }

//                print("Opacity \(settings.opacity), Hidden \(settings.hidden), Transparent \(settings.transparent)")
            }
        }
    }


    @objc func setup() {


        statusItem.button?.action = #selector(menuButtonClicked)

        popover.behavior = .transient
        popover.animates = true
        popover.contentSize = .init(width: 700, height: 700)
        popover.contentViewController = NSViewController()
        popover.contentViewController?.view = NSHostingView(rootView: settingsPopup)

        if let button = statusItem.button {
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: .maxY)
            popover.performClose(nil)
        }

    }

    @objc func toggleTransparency() {
        if !settings.hidden && delegates.count > 0 {
            settings.transparent = !settings.transparent
        }
    }

    func toggleHidden() {
        settings.hidden = !settings.hidden
    }
    
    func toggleAnimations() {
        settings.animations = !settings.animations
    }


    func increaseOpacity() {
        if !settings.hidden {
            if settings.opacity < 0.75 {
                settings.opacity += 0.25
            } else {
                settings.opacity = 1.0
            }
        }
    }

    func decreaseOpacity() {
        if !settings.hidden {
            if settings.opacity > 0.26 {
                settings.opacity -= 0.25
            } else {
                settings.opacity = 0.01
            }
        }
    }


    @objc func menuButtonClicked() {
        if popover.isShown {
            popover.performClose(nil)
            return
        }

        guard let button = statusItem.button else {return}

        popover.show(relativeTo: button.bounds, of: button, preferredEdge: .maxY)
        popover.contentViewController?.view.window?.makeKey()

    }
}




class WindowDelegate: NSWindowController, NSWindowDelegate {
    
    var parent: AppDelegate
    var navigationState: NavigationState
    var views:(WKWebView, WKWebView)?
    
    override func windowDidLoad() {
        super.windowDidLoad()
        self.window?.delegate = self
    }

    // Override the init method to set up your window and content view
    init(window: NSWindow?, parent: AppDelegate, navigationState: NavigationState) {
        self.parent = parent
        self.navigationState = navigationState
        super.init(window: window)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func windowWillClose(_ notification: Notification) {
        if let window = self.window {
            window.contentView?.layer?.removeAllAnimations()
            for view in window.contentView!.subviews {
                view.layer?.removeAllAnimations()
            }
            
            window.contentView = nil
            window.delegate = nil
            views = nil
            
            for webview in navigationState.webViews {
                if webview.observationInfo != nil {
                    webview.removeObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoBack))
                    webview.removeObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoForward))
                    webview.removeObserver(navigationState, forKeyPath: #keyPath(WKWebView.url))
                }
                webview.loadHTMLString("", baseURL: nil)
            }
        
            for monitor in navigationState.eventMonitors {
                NSEvent.removeMonitor(monitor)
            }
            navigationState.eventMonitors = []
        }
        if let index = parent.delegates.firstIndex(of: self) {
            self.parent.delegates.remove(at: index)
        }
        
    }

    func windowDidResize(_ notification: Notification) {
        refreshSize()
    }
    
    func refreshSize() {
        if let (webView, nsView) = views {
            webView.frame = CGRect(origin: .zero, size: nsView.bounds.size)
            if let window = self.window {
                UserDefaults.standard.set([window.frame.origin.x, window.frame.origin.y, window.frame.width, window.frame.height], forKey: "windowRect")
            }
        }
    }

    func windowDidMove(_ notification: Notification) {
        if let window = self.window {
            UserDefaults.standard.set([window.frame.origin.x, window.frame.origin.y, window.frame.width, window.frame.height], forKey: "windowRect")
        }
    }


    func windowDidBecomeKey(_ notification: Notification) {
        if let currentEvent = NSApplication.shared.currentEvent, currentEvent.type == .leftMouseDown, let window = window {
            DispatchQueue.main.async {
                NSApplication.shared.sendEvent(currentEvent)
            }
            UserDefaults.standard.set([window.frame.origin.x, window.frame.origin.y, window.frame.width, window.frame.height], forKey: "windowRect")
        }
    }

    func getCurrTitle() -> String? {
        if let index = navigationState.selectedWebIndex {
            if let s = navigationState.webViews[index].title {
                return !navigationState.webViews[index].new ? (s.count > 0 ? s : navigationState.webViews[index].url?.absoluteString ?? "Untitled") : "New Tab"
            } else {
                return "New Tab"
            }
        }
        return nil
    }
  
}


class Settings : ObservableObject {
    @Published var opacity = 1.0
    @Published var hidden = false
    @Published var transparent = false
    @Published var fullscreen = false
    @Published var dragLocation = [CGPoint(x:0 + b, y:0 + b), CGPoint(x:w - b, y:0 + b), CGPoint(x:0 + b, y:h - b), CGPoint(x:w - b, y:h - b)]
    @Published var animations = UserDefaults.standard.object(forKey: "animations") != nil ? UserDefaults.standard.bool(forKey: "animations") : true
    @Published var sticky = UserDefaults.standard.bool(forKey: "sticky")
    @Published var shadow = UserDefaults.standard.object(forKey: "shadow") != nil ? UserDefaults.standard.bool(forKey: "shadow") : true
}




extension KeyboardShortcuts.Name {
    static let hidden = Self("hidden")
    static let transparent = Self("transparent")
    static let upOpacity = Self("upOpacity")
    static let downOpacity = Self("downOpacity")
    static let focusSearchBar = Self("focusSearchBar")
    static let createNewWindow = Self("createNewWindow")
    static let createNewIncognitoWindow = Self("createNewIncognitoWindow")
    static let sticky = Self("sticky")
}




@MainActor
final class HiddenShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .hidden) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.toggleHidden()
            }
        }
    }
}

@MainActor
final class TransparentShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .transparent) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.toggleTransparency()
            }
        }
    }
}

@MainActor
final class UpOpacityShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .upOpacity) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.increaseOpacity()
            }
        }
    }
}

@MainActor
final class DownOpacityShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .downOpacity) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.decreaseOpacity()
            }
        }
    }
}

@MainActor
final class CreateNewWindowShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .createNewWindow) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.createWindow()
            }
        }
    }
}

@MainActor
final class CreateNewIncognitoWindowShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .createNewIncognitoWindow) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.createWindow(incognito: true)
            }
        }
    }
}

@MainActor
final class StickyShortcut: ObservableObject {

    var appdelegate:AppDelegate?

    init() {
        KeyboardShortcuts.onKeyDown(for: .sticky) { [self] in
            if let unwrapped = appdelegate {
                unwrapped.settings.sticky.toggle()
            }
        }
    }
}

// from: https://stackoverflow.com/a/42915296
extension NSImage {
    func resized(to newSize: NSSize) -> NSImage? {
        if let bitmapRep = NSBitmapImageRep(
            bitmapDataPlanes: nil, pixelsWide: Int(newSize.width), pixelsHigh: Int(newSize.height),
            bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
            colorSpaceName: .calibratedRGB, bytesPerRow: 0, bitsPerPixel: 0
        ) {
            bitmapRep.size = newSize
            NSGraphicsContext.saveGraphicsState()
            NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmapRep)
            draw(in: NSRect(x: 0, y: 0, width: newSize.width, height: newSize.height), from: .zero, operation: .copy, fraction: 1.0)
            NSGraphicsContext.restoreGraphicsState()

            let resizedImage = NSImage(size: newSize)
            resizedImage.addRepresentation(bitmapRep)
            return resizedImage
        }

        return nil
    }
}



// from: https://stackoverflow.com/a/70279092
extension View {
    func dragHandle() -> some View {
        self.overlay(DragWndView())
    }
}

struct DragWndView: View {

    var body: some View {
        Color.clear
            .overlay( DragWndNSRepr() )
    }
}


struct DragWndNSRepr: NSViewRepresentable {
    func makeNSView(context: Context) -> NSView {
        return DragWndNSView()
    }

    func updateNSView(_ nsView: NSView, context: Context) { }
}


class DragWndNSView: NSView {
    override public func mouseDown(with event: NSEvent) {
        window?.performDrag(with: event)
    }
}

