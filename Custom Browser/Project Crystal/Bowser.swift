
import SwiftUI
import WebKit
import Foundation
import Introspect
import SDWebImageSwiftUI
import OrderedCollections

// REALISTIC BUT SUCKY:
// Improve performance
// Refactor search completion system to consider title as well and be less confusing (with the switch around + " - Google Search" stuff

// LONG SHOTS:
// Figure out how to get modern looking favicons
// Implement full screen functionality (probably impossible)
// Full dragging capabilities


let bg = Color(red: 242.0 / 255, green: 237.0 / 255, blue: 225.0/255)
let green = Color(red: 14/255.0, green: 173/255.0, blue: 155/255.0)
let turquoise = Color(red: 14/255.0, green: 173/255.0, blue: 155/255.0)
let greenTurquoise = Color(red: 26/255.0, green: 201.5/255.0, blue: 77.5/255.0)

let bgDark = Color(red: 36/255.0, green: 35/255.0, blue: 32/255.0)
let greenDark = Color(red: 38.0/255, green: 230.0/255, blue: 0/255.0)
let turquoiseDark = Color(red: 38.0/255, green: 230.0/255, blue: 0/255.0)

let whiteDark = Color(white: 0.3)
let whiteLight = Color.white

let domainFont = CGFloat(13)
let tabHeight = CGFloat(37.5) //40
let tabWidth = CGFloat(200) //150

struct Bowser: View {

    @State var updater: Bool = false
    @StateObject var navigationState:NavigationState
    @State var loading:Bool = false

    @ObservedObject var settings:Settings

    @State var seed:[[CGPoint]] = []
    @State var transparencyAnimationCount = 0
    @FocusState var focus:Bool {
        didSet {
            searchSuggestions = false
            selectionNum = -1
        }
    }
    @State var transparencyOn:Bool

    //dragging controls
    @State var pos = 0.0
    @GestureState var loc = CGPoint(x:0, y:0)
    @GestureState var loc2 = CGPoint(x:0, y:0)
    @State var dragEnd = false
    @State var switchDragEnd = false
    @State var targetLoc = -1
    @State var draggingIndex = -1


    @State var searchSuggestions = false
    @State var suggestionList:[(String, URL, AnyView)] = []
    @State var selectionNum = -1


    @State var transferList:[(String, Int)] = []

    var incognito:Bool
    var parent:AppDelegate
    var mutator = Mutator()


    @State var willClose = false
    @State var tabToClose = -1

    @State var fullScreen = false

    @State var lfModal = false

    @Environment(\.colorScheme) var colorScheme: ColorScheme
    
    @State var domainWrapper = ""
    

    @ViewBuilder
    var TextField:some View {
//        SwiftUI.TextField(
//            "",
//            text: unwrappedBindingView()?.domain ?? $navigationState.urlString
//        )
        SearchBar(
            navState: navigationState,
//            text: unwrappedBindingView()?.domain ?? $navigationState.urlString,
            incognito: incognito, font: .systemFont(ofSize: domainFont, weight: .light),
            focused: focus,
            onSubmit: { search in
                var domain:String = "about:blank"
//                let search = (unwrappedView()?.domain ?? navigationState.urlString)

                if search.contains(" ") {
                    let encodedTerm = search.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                    if let encodedTerm = encodedTerm {
                        domain = "https://www.google.com/search?q=\(encodedTerm)"
                    }
                } else {
                    if search == "about:blank" {
                        domain = search
                    } else if String(search.prefix(8)) == "https://" || String(search.prefix(7)) == "http://" {
                        domain = search
                    } else if hasTLD(search) {
                        let prefix = ""
    //                    if String(search.prefix(4)) != "www." {
    //                        prefix += "www."
    //                    }
                        domain = "https://" + prefix + search
                    } else {
                        let encodedTerm = search.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                        if let encodedTerm = encodedTerm {
                            domain = "https://www.google.com/search?q=\(encodedTerm)"
                        }
                    }
                }

//
//                if (completionOn && searchSuggestions && completion.count > 0 && suggestionList.count > 0) {
//                    if suggestionList[0].1.absoluteString != "about:blank" {
//                        domain = suggestionList[0].1.absoluteString
//                    } else {
//                        let encodedTerm = stripGoogleSearchSuffix(str: suggestionList[0].0).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
//                        if let encodedTerm = encodedTerm {
//                            domain = "https://www.google.com/search?q=\(encodedTerm)"
//                        }
//                    }
//                }

                focus = false

                if let unwrapped = URL(string: domain) {
                    if search.count > 0 {
                        let request = URLRequest(url: unwrapped)
                        if let index = navigationState.selectedWebIndex {

                            navigationState.webViews[index].load(request)
                            navigationState.webViews[index].domain = domain

                        }
                    }
                }
            },
            onChange: { initial in
                if focus {
                    searchSuggestions = true
                    if mutator.suggestUpdates {
                        let autocomplete = updateSuggestions(initial, linkOnly: isLink(initial))
                        selectionNum = -1
                        return autocomplete
                    } else {
                        mutator.suggestUpdates = true
                    }
                } else {
                    searchSuggestions = false
                }
                return nil
            }
        )
        .focused($focus)
        .textFieldStyle(.plain)
        .padding(EdgeInsets(top: 4.19, leading: 10, bottom: 4.19, trailing: 10))
        .background(VisualEffectBackground(material: incognito ? .sidebar : .sidebar, blendingMode:  .behindWindow, emphasized: true, dark: incognito).opacity(1).overlay((incognito ? Color(white: 0.2) : whiteLight).opacity(focus ? 1 : 0.6)))
        .disableAutocorrection(true)
//        .foregroundColor(incognito ? .white : .black)
        .cornerRadius(15)
        .overlay {
            if focus {
                RoundedRectangle(cornerRadius: 15)
                    .stroke((incognito ? greenDark : green))
                    .zIndex(4)
            }
        }
        .overlay(alignment: .topLeading) {
            HStack {
                SearchSuggestions().isHidden(!(searchSuggestions && focus), remove: true)
                    .zIndex(11)
                Spacer()
            }.frame(width: navigationState.window.frame.width)
        }
        .font(.system(size: domainFont, weight: .light))
//        .introspectTextField { textField in
//            if let t = textField.currentEditor() as? NSTextView {
//                t.insertionPointColor = completionOn && searchSuggestions && completion.count > 0 ? .clear : (incognito ? .white : .black)
//                if completionOn && searchSuggestions && completion.count > 0 {
//                    t.updateInsertionPointStateAndRestartTimer(true)
//                }
//            }
//        }
//        .padding(.bottom, 4)
        .frame(maxWidth: .infinity)
        .zIndex(10)
        .padding(.leading, 10)
        .preferredColorScheme(incognito ? .dark : .light)
        .onTapGesture {
            focus = true
        }
        

    }

    var body: some View {

        return VStack (spacing: 0) {

            Group {
                HStack(alignment: .bottom, spacing: -1) {
                    
                    
                    SwiftUI.ForEach(Array(navigationState.webViews.enumerated()), id: \.offset) { index, tab in
                        completeTabBuilder(i: index, currentIndex: draggingIndex)
                    }
                    
                    Button {
                        searchSuggestions = false
//                        focus = false
                        createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true, end: false)
                    } label: {
                        ZStack {
                            Image(systemName: "plus")
                                .font(Font.system(size: 13))
                                .foregroundColor((incognito ? greenDark : green))
                            Circle().fill(.clear).frame(width: 25, height: 25)
                        }
                    }.buttonStyle(AnimatedStyle(animations: settings.animations))
                        .padding([.leading, .trailing], 10)
                        .padding(.bottom, 1/*7*/)
                        .keyboardShortcut("t", modifiers: [.command])
                        .help("New tab")
                        .highPriorityGesture(TapGesture()
                            .onEnded {
                                searchSuggestions = false
//                                focus = false
                                createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true, end: true)
                            })
                        .padding(.trailing, 15)
                    
                    
                    Spacer(minLength: 0)
                    
                    
                    HStack {
                        
                    }.frame(width: 25)
                    //204.5
                    //85.5
                    //76.0
                    //25.0
                    //                    .background(
                    //                                    GeometryReader { proxy in
                    //                                        Color.clear // we just want the reader to get triggered, so let's use an empty color
                    //                                            .onAppear {
                    //                                                print("width: \(proxy.size.width)")
                    //                                            }
                    //                                    }
                    //                                )
                    
                }
                .frame(maxWidth: .infinity)
                .padding(.top, 7.5)
                .padding(.leading, 95)
                .background(VisualEffectBackground(material: incognito ? .sidebar : .titlebar, blendingMode:  .behindWindow, emphasized: true, dark: incognito).opacity(1).overlay((incognito ? Color(white: 0.1) : whiteLight).opacity(incognito ? 0.45 : (0.3))).saturation(1.3).ignoresSafeArea(.container, edges: .top).dragHandle())
                .zIndex(2)
                
                HStack(alignment: .center, spacing: 1/*10*/) {
                    Button {
                        if let index = navigationState.selectedWebIndex {
                            if navigationState.webViews[index].canGoBack {
                                navigationState.webViews[index].goBack()
//                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
//                                    updater.toggle()
//                                }
                            } else {
                                if !navigationState.webViews[index].new && navigationState.webViews[index].hasNewPage {
                                    navigationState.webViews[index].new = true
                                    navigationState.webViews[index].domain = ""
                                    updater.toggle()
                                }
                            }
                        }
                    } label: {
                        ZStack {
                            Image(systemName: "chevron.left")
                                .font(Font.system(size: 14, weight: .regular))
                                .foregroundColor((navigationState.selectedWebIndex.map {(!navigationState.webViews[$0].new && navigationState.webViews[$0].hasNewPage) || navigationState.webViews[$0].canGoBack} ?? false) ? (incognito ? greenDark : green) : Color(white: 0.6).opacity(0.4))
                            Circle().fill(.clear).frame(width: 25, height: 25)
                        }
                    }.buttonStyle(AnimatedStyle(disabled: navigationState.selectedWebIndex.map { !((!navigationState.webViews[$0].new && navigationState.webViews[$0].hasNewPage) || navigationState.webViews[$0].canGoBack) } ?? false, animations: settings.animations))
                        .help("Go back")
                        .brightness(incognito ? 0 : -0.2)


                    Button {
                        if let index = navigationState.selectedWebIndex {
                            if navigationState.webViews[index].canGoForward {
                                navigationState.webViews[index].goForward()
//                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
//                                    updater.toggle()
//                                }
                            } else if navigationState.webViews[index].new && navigationState.webViews[index].url != nil && !loading {
                                navigationState.webViews[index].new = false
                                if let url = navigationState.webViews[index].url {
                                    navigationState.webViews[index].domain = url.absoluteString
                                }
                                updater.toggle()
                            }
                        }
                    } label: {
                        ZStack {
                            Image(systemName: "chevron.right")
                                .font(Font.system(size: 14, weight: .regular))
                                .foregroundColor((navigationState.selectedWebIndex.map {navigationState.webViews[$0].canGoForward || (navigationState.webViews[$0].new && navigationState.webViews[$0].url != nil && !loading)} ?? false) ? (incognito ? greenDark : green) : Color(white: 0.6).opacity(0.4))
                            Circle().fill(.clear).frame(width: 25, height: 25)
                        }
                    }.buttonStyle(AnimatedStyle(disabled: navigationState.selectedWebIndex.map { !navigationState.webViews[$0].canGoForward || (navigationState.webViews[$0].new && navigationState.webViews[$0].url != nil && !loading) } ?? false, animations: settings.animations))
                        .help("Go forward")
                        .brightness(incognito ? 0 : -0.2)

                    Button {
                        if (loading && navigationState.selectedWebIndex.map { navigationState.webViews[$0].load && navigationState.webViews[$0].isLoading } ?? false) {
                            if let index = navigationState.selectedWebIndex {
                                navigationState.webViews[index].stopLoading()
                                navigationState.webViews[index].load = false
                                loading = false
                            }
                        } else {
                            if let index = navigationState.selectedWebIndex {
                                navigationState.webViews[index].reload()
                            }
                        }
                    } label: {
                        ZStack {
                            Image(systemName: (loading && navigationState.selectedWebIndex.map { navigationState.webViews[$0].load && navigationState.webViews[$0].isLoading } ?? false) ? "xmark" : "arrow.clockwise")
                                .font(Font.system(size: 14, weight: .regular))
                                .foregroundColor((incognito ? greenDark : green))
                            Circle().fill(.clear).frame(width: 25, height: 25)
                        }
                    }.buttonStyle(AnimatedStyle(animations: settings.animations))
//                        .padding(.leading, 3)
                        .help((loading && navigationState.selectedWebIndex.map { navigationState.webViews[$0].load && navigationState.webViews[$0].isLoading } ?? false) ? "Stop loading" : "Reload")
                        .brightness(incognito ? 0 : -0.2)

                    TextField
                    Spacer(minLength: 0).layoutPriority(-5)
                    
                }
//                .frame(height: 27)
                .padding([.top, .bottom], 7)
                .padding([.trailing], 12)
                .padding([.leading], 8)
                .background(incognito ? whiteDark : whiteLight)
                .frame(maxWidth: .infinity)
                .zIndex(1)
            }
            .isHidden(fullScreen, remove: true)
            .background(incognito ? whiteDark : whiteLight)



            VStack(spacing: 0) {
//
//                    Rectangle().fill(Color(white: 0.6).opacity(0.5)).frame(width: 1).frame(maxHeight: 20).padding(.leading, 3).padding(.trailing, 10)
//
//                    HStack(spacing: 8) {
//                        Button {
//                            cookieClearConfirmation = true
//                        } label: {
//                            Image(systemName: "circle.hexagongrid.circle.fill")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(.orange)
//                        }.buttonStyle(AnimatedStyle(animations: settings.animations))
//                            .confirmationDialog(
//                                "Do you want to clear all cookies for this browser?",
//                                isPresented: $cookieClearConfirmation
//                            ) {
//                                Button("Yes") {
//                                    HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)
//
//                                    WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
//                                        records.forEach { record in
//                                            WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
//                                        }
//                                    }
//                                }
//                            }.help("Clear cookies")
//
//                        Button {
//                            searchClearConfirmation = true
//                        } label: {
//                            Image(systemName: "trash")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(.red)
//                        }.buttonStyle(AnimatedStyle(animations: settings.animations))
//                            .confirmationDialog(
//                                "Do you want to clear all search history for this browser?",
//                                isPresented: $searchClearConfirmation
//                            ) {
//                                Button("Yes") {
//                                    StoredData.clearData()
//                                }
//                            }.help("Clear search history")
//
//                    }.frame(height: 27)
                

//                Rectangle().fill(incognito ? whiteDark : whiteLight).frame(maxWidth: .infinity).frame(height: 8).zIndex(1).isHidden(fullScreen, remove: true)
                ZStack {
                    NewPage(incognito: incognito, navigationState: navigationState, animations: settings.animations).zIndex(-1)
                        .isHidden(!(unwrappedView()?.new ?? true), remove: true)


                    WebView2(navigationState: navigationState, loading: $loading, browser: self, needsInit: navigationState.selectedWebIndex != nil)
                        .clipped()
                        .zIndex(-2)
                }
                .zIndex(-1)
                .sheet(isPresented: $lfModal) {
                    VStack {
                        Text("\(mutator.failedURL.count > 0 ? "\"\(mutator.failedURL)\"" : "Page") failed to load").truncationMode(.middle).font(.title).padding(10)
                        Text("Click to dismiss").font(.body)
                    }.padding(70)
                        .frame(maxWidth: max(navigationState.window.frame.width-100, 1))
                        .background(VisualEffectBackground(material: .sidebar, blendingMode: .behindWindow, emphasized: true, dark: colorScheme == .dark))
                        .onTapGesture {
                            lfModal = false
                        }
                }
            }
        }
            .onAppear {
                if navigationState.selectedWebIndex == nil {
                    DispatchQueue.main.async {
                        createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true)
                    }
                } else if navigationState.webViews.count > 0 {
                    DispatchQueue.main.async {
                        let wv = navigationState.webViews[0]
                        wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoBack), options: .new, context: nil)
                        wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoForward), options: .new, context: nil)
                        wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.url), options: .new, context: nil)
                        
                        createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true, nlFocus: false)
                        deleteWebView(index: navigationState.webViews.count - 1)
//                        focus = false
                    }
                }
                rerollCrystalSeed()
//
//                navigationState.eventMonitors.append(NSEvent.addLocalMonitorForEvents(matching: .leftMouseDown) { nsevent in
//                    if nsevent.windowNumber == navigationState.window.windowNumber {
//                        if completionOn && searchSuggestions && completion.count > 0 {
//                            completion = ""
//                            completionOn = false
//                        }
//                    }
//                    return nsevent
//                })
                navigationState.eventMonitors.append(NSEvent.addLocalMonitorForEvents(matching: [.keyDown]) { nsevent in
                    if nsevent.windowNumber == navigationState.window.windowNumber {
                        if focus {
                            if nsevent.keyCode == 125 { // down
                                selectionNum = selectionNum < suggestionList.count - 1 && selectionNum >= 0 ? selectionNum + 1 : 0
                                mutator.suggestUpdates = false
//                                completionOn = false
                                if searchSuggestions && suggestionList.count > 0 {
                                    if suggestionList[selectionNum].1.absoluteString != "about:blank" {
                                        if let v = unwrappedView() {
                                            v.domain = suggestionList[selectionNum].1.absoluteString
                                        } else {
                                            navigationState.urlString = suggestionList[selectionNum].1.absoluteString
                                        }
                                    } else {
                                        if let v = unwrappedView() {
                                            v.domain = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
                                        } else {
                                            navigationState.urlString = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
                                        }
                                    }
                                }
                            } else if nsevent.keyCode == 126 { // up
                                selectionNum = selectionNum > 0 && selectionNum <= suggestionList.count - 1 ? selectionNum - 1 : suggestionList.count - 1
                                mutator.suggestUpdates = false
//                                completionOn = false
                                if searchSuggestions && suggestionList.count > 0 {

                                    if suggestionList[selectionNum].1.absoluteString != "about:blank" {
                                        if let v = unwrappedView() {
                                            v.domain = suggestionList[selectionNum].1.absoluteString
                                        } else {
                                            navigationState.urlString = suggestionList[selectionNum].1.absoluteString
                                        }
                                    } else {
                                        if let v = unwrappedView() {
                                            v.domain = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
                                        } else {
                                            navigationState.urlString = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
                                        }
                                    }
                                    return nil
                                }
//                            } else if nsevent.keyCode == 123 {
//                                completionOn = false
//                            } else if nsevent.keyCode == 124 {
//                                if completionOn && searchSuggestions && completion.count > 0 {
//                                    if let v = unwrappedView() {
//                                        v.domain += completion
//                                    } else {
//                                        navigationState.urlString += completion
//                                    }
//                                }
//                                completionOn = false
                            } else if nsevent.keyCode == 51 {
                                if nsevent.modifierFlags.contains(.control) && nsevent.modifierFlags.contains(.shift) {
                                    if searchSuggestions && suggestionList.count > 0 {
                                        if selectionNum != -1 {

                                            
//                                            print("deleting: \(suggestionList[selectionNum].1.absoluteString)")
                                            if suggestionList[selectionNum].1.absoluteString != "about:blank" {
                                                StoredData.removeObject(forKey: suggestionList[selectionNum].1.absoluteString)
                                            } else if let dict = StoredData.dictionaryRepresentation(), suggestionList[selectionNum].0.hasSuffix(" - Google Search") {
                                                for (key, search) in dict {
                                                
                                                    if search.title == suggestionList[selectionNum].0 {
                                                        StoredData.removeObject(forKey: key)
                                                        break
                                                    }
                                                }
                                            }
                                            
                                            suggestionList = []
                                            return nil
                                        }
                                    }
                                }
                                
                                
                                //else {
//
//                                    if completionOn && searchSuggestions && completion.count > 0 {
//                                        completionOn = false
//                                        if !nsevent.modifierFlags.contains(.command) {
//                                            return nil
//                                        }
//                                    } else {
//                                        completionOn = false
//                                        mutator.completionUpdates = false
//                                    }
//
//                                }
                            }
                        }

                        // keyboard shortcut stuff
                        if nsevent.modifierFlags.contains(.command) {
                            if nsevent.keyCode == 13 && fullScreen {
                                return nil
                            }

                            if nsevent.keyCode == 37 {
                                focus = true
                                return nil
                            }

                            if nsevent.keyCode == 17 {
                                if nsevent.modifierFlags.contains(.shift) {
                                    if navigationState.lastClosed.count > 0 {
                                        searchSuggestions = false
                                        focus = false
                                        let request = URLRequest(url: navigationState.lastClosed[navigationState.lastClosed.count - 1])
                                        navigationState.lastClosed.removeLast()
                                        createNewWebView(withRequest: request)
                                    }
                                    return nil
                                }
                            }

                            if nsevent.keyCode == 3 {
                                if nsevent.modifierFlags.contains(.shift) {
                                    fullScreen.toggle()
                                    return nil
                                }
                            }

                            if nsevent.keyCode == 45 {
                                if nsevent.modifierFlags.contains(.shift) {
                                    parent.createWindow(incognito: true, offset: 20)
                                    return nil
                                } else {
                                    parent.createWindow(offset: 20)
                                    return nil
                                }
                            }

                        }

                        if nsevent.modifierFlags.contains(.command) {
                            if nsevent.keyCode == 18 { switchTab(index:0); return nil}
                            if nsevent.keyCode == 19 { switchTab(index:1); return nil}
                            if nsevent.keyCode == 20 { switchTab(index:2); return nil}
                            if nsevent.keyCode == 21 { switchTab(index:3); return nil}
                            if nsevent.keyCode == 23 { switchTab(index:4); return nil}
                            if nsevent.keyCode == 22 { switchTab(index:5); return nil}
                            if nsevent.keyCode == 26 { switchTab(index:6); return nil}
                            if nsevent.keyCode == 28 { switchTab(index:7); return nil}
                            if nsevent.keyCode == 25 { switchTab(index:navigationState.webViews.count-1); return nil}
                        } else if nsevent.modifierFlags.contains(.control) {
                            if nsevent.keyCode == 48 {
                                if let index = navigationState.selectedWebIndex {
                                    if nsevent.modifierFlags.contains(.shift) {
                                        switchTab(index: index == 0 ? navigationState.webViews.count - 1 : index - 1)
                                        return nil
                                    } else {
                                        switchTab(index: index == navigationState.webViews.count - 1 ? 0 : index + 1)
                                        return nil
                                    }
                                }
                            }
                        }


                    }
                    return nsevent
                })
            }
            .onChange(of: willClose) { new in
                navigationState.webViews[0].removeFromSuperview()
                navigationState.webViews[0].navigationDelegate = nil
                if navigationState.webViews[0].isTransferring {
                    navigationState.webViews[0].isTransferring = false
                } else {
                    navigationState.webViews[0].loadHTMLString("", baseURL: nil)
                }
                navigationState.selectedWebIndex = nil
                navigationState.webViews.remove(at: 0)
                navigationState.window.close()
            }
            .onChange(of: tabToClose) { tab in
                let index = tab
                if index != -1 {
                    tabToClose = -1
                    if let selectedIndex = navigationState.selectedWebIndex {
                        var new = selectedIndex >= index ? selectedIndex - 1 : selectedIndex
                        if new < 0 {
                            new = 0
                        } else if new >= navigationState.webViews.count - 1 {
                            new = navigationState.webViews.count - 2
                        }
                        
                        if selectedIndex == index {
                            navigationState.webViews[new].shouldBecomeFirstResponder = true
                        }

                        withAnimation(settings.animations/* && (tabSpace(true) == tabSpace(true, manualCount: max(navigationState.webViews.count - 1, 1))) && (tabSpace() == tabSpace(manualCount: max(navigationState.webViews.count - 1, 1)))*/ ? .easeOut : nil) {
                            
                            navigationState.selectedWebIndex = new
                            
                            if let url = navigationState.webViews[index].url {
                                navigationState.lastClosed.append(url)
                            }

                            if navigationState.webViews[index].isTransferring {
                                navigationState.webViews[index].isTransferring = false
                            } else {
                                navigationState.webViews[index].loadHTMLString("", baseURL: nil)
                            }

                            navigationState.webViews[index].removeFromSuperview()
                            navigationState.webViews[index].navigationDelegate = nil
                            navigationState.webViews.remove(at: index)
                            navigationState.manualURLStringUpdate()

                        }
                    }
                }
            }
            .onChange(of: settings.transparent) { _ in
                DispatchQueue.main.asyncAfter(deadline: .now()) {
                    transparencyAnimationCount += 1
                    transparencyOn = settings.transparent
                }
                DispatchQueue.main.asyncAfter(deadline: .now() + 1.25) {
                    transparencyAnimationCount -= 1
                }
            }
            .onChange(of: fullScreen) {_ in
                DispatchQueue.main.async {
                    if let del = navigationState.window.delegate as? WindowDelegate {
                        del.refreshSize()
                    }
                }
            }
            .onTapGesture {
                focus = false
            }
            .ignoresSafeArea(.container, edges: .top)


    }

    func isLink(_ s : String) -> Bool {
        return s == "about:blank" || (!s.contains(" ") && (s.hasPrefix("http://") || s.hasPrefix("https://")))
    }

    func unwrappedView() -> MyWebView? {
        if let index = navigationState.selectedWebIndex {
            if index < navigationState.webViews.count && index >= 0 {
                return navigationState.webViews[index]
            } else {
                return nil
            }
        } else {
            return nil
        }
    }

    func unwrappedBindingView() -> Binding<MyWebView>? {
        if willClose {
            return nil
        }
        if let index = navigationState.selectedWebIndex {

            if index == tabToClose {
                return nil
            }

            if index < navigationState.webViews.count && index >= 0 {
                return $navigationState.webViews[index]
            } else {
                return nil
            }
        } else {
            return nil
        }
    }

    func createNewWebView(withRequest request: URLRequest, noLoad: Bool = false, end: Bool = false, nlFocus:Bool = true) {
        let index = navigationState.selectedWebIndex ?? -1
        withAnimation(settings.animations/* && (tabSpace(true) == tabSpace(true, manualCount: navigationState.webViews.count + 1)) && (tabSpace() == tabSpace(manualCount: max(navigationState.webViews.count - 1, 1)))*/ ? .easeOut : nil) {
            let wv = MyWebView(frame: .zero, configuration: navigationState.config)
            wv.navigationDelegate = navigationState
            wv.allowsMagnification = true
            wv.customUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
            

            wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoBack), options: .new, context: nil)
            wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.canGoForward), options: .new, context: nil)
            wv.addObserver(navigationState, forKeyPath: #keyPath(WKWebView.url), options: .new, context: nil)

            navigationState.webViews.insert(wv, at: end ? navigationState.webViews.count : index + 1)

            if !noLoad {
                wv.new = false
                wv.hasNewPage = false
                wv.load(request)
                wv.shouldBecomeFirstResponder = true
            } else {
                DispatchQueue.main.async {
                    focus = nlFocus
                }
            }
            rerollCrystalSeed()
            navigationState.selectedWebIndex = end ? navigationState.webViews.count - 1 : index + 1
            
        }
        
    }

    func deleteWebView(index:Int?) {
        searchSuggestions = false
        
        if navigationState.webViews.count == 1 {
            willClose = true
        } else {
            if let index = index {
                tabToClose = index
            }
        }
        rerollCrystalSeed()

    }


    func stripGoogleSearchSuffix(str: String) -> String {
        if str.hasSuffix(" - Google Search") {
            return String(str[str.startIndex..<str.index(str.endIndex, offsetBy: -16)])
        } else {
            return str
        }
    }

//    @ViewBuilder
//    func highlightedCompletion() -> some View {
//        HStack(spacing: 1.5) {
//            Text(unwrappedView()?.domain ?? navigationState.urlString)
//                .font(.system(size: domainFont, weight: .light))
//                .fixedSize()
//                .foregroundColor((incognito ? whiteDark : whiteLight).opacity(0))
//
//            Text(completion)
//                .font(.system(size: domainFont, weight: .light))
//                .fixedSize()
//                .foregroundColor(incognito ? .white : .black)
//                .background(Rectangle().fill(Color(red: 51/255.0, green: 153/255.0, blue: 255/255.0, opacity: incognito ? 0.6 : 0.3)).frame(maxWidth: .infinity, maxHeight: .infinity))
//                .padding(.trailing, 3)
//
//        }
//        .allowsHitTesting(false)
//    }

    @ViewBuilder
    func SearchSuggestions() -> some View {

        VStack(alignment: .leading, spacing: 0) {
            ForEach(Array(suggestionList.enumerated()), id: \.offset) { i, entry in
                Button {
                    focus = false
                    if entry.1.absoluteString != "about:blank" {
                        let request = URLRequest(url: entry.1)
                        if let index = navigationState.selectedWebIndex {
                            navigationState.webViews[index].load(request)
                        }
                    } else {
                        let encodedTerm = stripGoogleSearchSuffix(str: entry.0).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                        if let encodedTerm = encodedTerm {
                            let domain = "https://www.google.com/search?q=\(encodedTerm)"
                            if let url = URL(string: domain) {
                                let request = URLRequest(url: url)
                                if let index = navigationState.selectedWebIndex {
                                    navigationState.webViews[index].load(request)
                                }
                            }
                        }
                    }

                } label: {
                    HStack(spacing: 0) {
                        GeometryReader() { geometry in
                            let w = geometry.size.width
                            let h = geometry.size.height
                            Path { path in
                                path.move(to: CGPoint(x: 0, y: 0))
                                path.addLine(to: CGPoint(x: 0, y: (i == suggestionList.count - 1) ? h/2 : h))
                                path.move(to: CGPoint(x: 0, y: h/2))
                                path.addLine(to: CGPoint(x: w, y: h/2))
                            }
                            .stroke((incognito ? turquoiseDark : turquoise).opacity(1),
                                    lineWidth: 0.5)
//                            .colorInvert()
//                            .brightness(incognito ? 0.4 : 0)
//                            .saturation(1.5)
                        }
                        .frame(width: domainFont, height: 30)
                        .padding(.leading, 15)


                        HStack(spacing: 0) {

                            entry.2
                                .padding(.leading, 6)
                                .padding(.trailing, 12)
                                .fixedSize()

                            getSuggestionText(entry: entry)
                        }
                        //                        .padding([.bottom, .top], 8)
                        .padding(.trailing, 100)
                        //                        .border(.blue)
                    }
                }
                .buttonStyle(SuggestionStyle(selected: selectionNum == i, incognito: incognito, animations: settings.animations))
            }
        }
            .cornerRadius(10)
//            .overlay {
//                RoundedRectangle(cornerRadius: 10)
//                    .stroke(LinearGradient(stops: [Gradient.Stop(color: incognito ? greenDark : turquoise, location: 0), Gradient.Stop(color: .clear, location: 1)], startPoint: .bottomLeading, endPoint: UnitPoint(x: 0.1, y: 0.4)), lineWidth: 1)
//            }
            .offset(y: 29)
            .zIndex(9)

    }

    @ViewBuilder
    func getSuggestionText(entry:(String, URL, AnyView)) -> some View {
        Text((entry.0.hasSuffix(" - Google Search")) ? String(entry.0[entry.0.startIndex..<entry.0.index(entry.0.endIndex, offsetBy: -16)]) : entry.0)
            .font(.system(size: domainFont, weight: .light))
            .foregroundColor(incognito ? .white : .black)
        + Text((entry.1.absoluteString != "about:blank") ? "\(entry.0.count < 1 ? "": "     ")\(Image(systemName: "link"))  \(entry.1.absoluteString)" : "")
            .font(.system(size: domainFont, weight: .light))
            .foregroundColor(Color(red: 51/255.0, green: 153/255.0, blue: 255/255.0))

    }

    func updateSuggestions(_ input: String, linkOnly: Bool = false) -> String? {
        let prefix = stripHTTP(url: input)
        if prefix.count == 0 {
//            completionOn = false
            suggestionList = []
            return nil
        }

//        if let dict = StoredData.dictionaryRepresentation() {
//            for key in dict.keys {
//                if let arr = StoredData.array(forKey: key), arr.count == 2 {
//                    let count = arr[1] as! Int
//                    if count < 1 {
//                        StoredData.removeObject(forKey: key)
//                    }
//                }
//            }
//
////            if dict.keys.count > 200 {
////                let sorted = dict.keys.sorted(by: {
////                    StoredData.array(forKey: $0)![1] as! Int > StoredData.array(forKey: $1)![1] as! Int
////                })
////                for i in 200..<sorted.count {
////                    StoredData.removeObject(forKey: sorted[i])
////                }
////            }
//        }

        var domainMatches:OrderedDictionary<String, Search> = [:]

        if let dict = StoredData.dictionaryRepresentation() {
            domainMatches = dict.filter {
                (stripHTTP(url: $0.key).lowercased().hasPrefix(prefix.lowercased()) && $0.key != "about:blank" && !$0.value.title.contains(" - Google Search")) || (stripGoogleSearchSuffix(str: $0.value.title).lowercased().hasPrefix(prefix.lowercased()) || (prefix.count > 4 && stripGoogleSearchSuffix(str: $0.value.title).lowercased().contains(prefix.lowercased())))
            }
        }
        


        var list:[(String, URL, AnyView)] = []


        for (key, search) in domainMatches.prefix(5) {

            let title = search.title
            
            if list.contains(where: { $0.0 == title }) {
                continue
            }

            if title.hasSuffix(" - Google Search") {

                if !linkOnly {
                    let view = Image(systemName: "magnifyingglass.circle")
                        .font(Font.system(size: 12))
//                            .foregroundColor((incognito ? turquoiseDark : turquoise))
                        .foregroundColor(Color(red: 51/255.0, green: 153/255.0, blue: 255/255.0))

                    list.append((title, URL(string: "about:blank")!, AnyView(view)))
                }

            } else {
                let s = "https://www.google.com/s2/favicons?sz=256&domain=\(key)"
                let view = WebImage(url: URL(string: s))
                    .placeholder {
                        Image(systemName: "globe.americas.fill")
                            .font(.system(size: 12))
                            .foregroundColor(incognito ? greenDark : green)
                            .colorInvert()
                            .brightness(incognito ? 0.3 : 0)
                    }
                    .resizable()
                    .frame(width: 14, height: 14)
                    .clipped()

                list.append((title, URL(string: key)!, AnyView(view)))
            }
        
        }

        var completion = ""
        if list.count > 0 {
            if list[0].1.absoluteString != "about:blank" {
                completion = list[0].1.absoluteString
            } else {
                if list[0].0.hasSuffix(" - Google Search") {
                    completion = String(list[0].0[list[0].0.startIndex..<list[0].0.index(list[0].0.endIndex, offsetBy: -16)])
                } else {
                    completion = list[0].0
                }
            }
        } else {
            completion = ""
        }

        completion = stripHTTP(url: completion)
        if completion.last == "/" {
            completion.popLast()
        }
        
        if !completion.lowercased().hasPrefix(prefix.lowercased()) {
            completion = ""
        }
        
        if completion.count >= prefix.count {
            completion = String(completion.suffix(completion.count - prefix.count))
        }
        

        if linkOnly {
            suggestionList = list
            return completion
        }

        let search = (prefix).replacingOccurrences(of: " ", with: "+")
        let url = URL(string: "https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=\(search)")

        if let url = url {
            let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
                if let xml = data {
                    let xmlParser = XMLParser(data: xml)
                    let delegate = ParserDelegate(urls: $suggestionList, bufferedPrefix: list)
                    xmlParser.delegate = delegate
                    xmlParser.parse()
                    delegate.process()
                } else {
                    suggestionList = list
                }
            }

            task.resume()
        }

//        if mutator.completionUpdates {
//            completionOn = true
//        } else {
//            mutator.completionUpdates = true
//        }

        return completion
    }
    
    func stripHTTP(url: String) -> String {
        var str = url
        if str.hasPrefix("http://") {
            str.removeFirst(7)
        }

        if str.hasPrefix("https://") {
            str.removeFirst(8)
        }

        if str.hasPrefix("www.") {
            str.removeFirst(4)
        }

        return str
    }


    func completeTabBuilder(i:Int, currentIndex: Int) -> some View {

        return tabBuilderAuxiliary(i: i, currentIndex: currentIndex)
            .offset(x: (targetLoc != -1) ? (i < currentIndex ? (targetLoc <= i ? tabSpace(currentIndex == navigationState.selectedWebIndex)-1 : 0) : (i > currentIndex ? (targetLoc >= i ? -tabSpace(currentIndex == navigationState.selectedWebIndex)+1 : 0) : 0) ) : 0)
            .contextMenu {
                Button("Move to New Window") {

                    parent.transferView(webView: navigationState.webViews[i], windowNumber: nil)

                    navigationState.webViews[i].isTransferring = true
                    deleteWebView(index: i)

                }.disabled(navigationState.webViews.count <= 1 || incognito)
                    .onAppear {
                        transferList = getWindowNames()
                    }
                Menu("Move to Another Window") {
                    ForEach(Array(transferList.enumerated()), id: \.offset) { index, tuple in
                        Button(tuple.0) {
                            parent.transferView(webView: navigationState.webViews[i], windowNumber: tuple.1)

                            navigationState.webViews[i].isTransferring = true
                            deleteWebView(index: i)
                        }
                    }
                }
                .isHidden(transferList.count < 1 || incognito, remove: true)
            }
    }

    func getWindowNames() -> [(String, Int)] {
        var result:[(String, Int)] = []

        for window in NSApplication.shared.windows {
            if let delegate = window.delegate as? WindowDelegate {
                if window.windowNumber == navigationState.window.windowNumber { continue }

                var title = ""

                if let s = delegate.getCurrTitle() {
                    title = s
                } else {
                    title = "New Tab"
                }


                let count = delegate.navigationState.webViews.count
                title += " - \(count) Tab\(count > 1 ? "s" : "")"

                result.append((title, window.windowNumber))

            }
        }
        return result
    }

    @ViewBuilder
    func tabBuilderAuxiliary(i:Int, currentIndex:Int) -> some View {
        if i == navigationState.selectedWebIndex {
            if let s = navigationState.webViews[i].title {
                currentTabBuilder(title: !navigationState.webViews[i].new ? (s.count > 0 ? s : navigationState.webViews[i].url?.absoluteString ?? "Untitled") : "New Tab", url: navigationState.webViews[i].url)
            } else {
                currentTabBuilder(title: "New Tab", url: nil)
            }
        } else {
            if let s = navigationState.webViews[i].title  {
                otherTabBuilder(title: !navigationState.webViews[i].new ? (s.count > 0 ? s : navigationState.webViews[i].url?.absoluteString ?? "Untitled") : "New Tab", url: navigationState.webViews[i].url, index: i)
                    .transition((tabSpace() < 150.0) ? .scale : .opacity)//(scale: 0.5, anchor: UnitPoint(x: 0, y: 0.75)))
            } else {
                otherTabBuilder(title: "New Tab", url: nil, index: i)
            }
        }
    }
    
    func tabSpace(_ big: Bool = false, manualCount:Int? = nil) -> Double {
        let available = navigationState.window.frame.width - 131 - 44
        let count = manualCount ?? navigationState.webViews.count
        return min(tabWidth, CGFloat(available) / CGFloat(max(count, 1)))
//        if 250.0 + CGFloat(count - 1) * 149.0 > available {
//            if 150.0 + CGFloat(count - 1) * 149.0 > available {
//                if big {
//                    return 150.0
//                } else {
//                    return ((available - 150.0) / CGFloat(count - 1)) + 1.0
//                }
//            } else {
//                if big {
//                    return available - CGFloat(count - 1) * 149.0
//                } else {
//                    return 150.0
//                }
//            }
//        } else {
//            if big {
//                return 250.0
//            } else {
//                return 150.0
//            }
//        }


        // * big tab priority * //
//        if available - 225.0 < CGFloat(navigationState.webViews.count - 1) * 4.0 {
//            if big {
//                return available - CGFloat(navigationState.webViews.count - 1) * 4.0
//            } else {
//                return 5.0
//            }
//        } else {
//            if big {
//                return 225.0
//            } else {
//                return min((available - 225.0) / CGFloat(navigationState.webViews.count - 1) + 1, 150.0)
//            }
//        }
    }

    func currentTabBuilder(title:String, url:URL?) -> some View {
        let radius = 10.0
        let width = tabSpace(true)
//        print("big: \(tabSpace(true)), normal: \(tabSpace())")
        let maxwidth = tabWidth//250.0
        let view = HStack(alignment: .bottom, spacing: 0) {

            Taper(left: true, incognito: incognito)
                .frame(width: radius, height: radius)


            ZStack (alignment: .bottom) {

                Rectangle()
                    .fill(.clear)
                    .background(LinearGradient(colors: [incognito ? whiteDark : whiteLight, .clear], startPoint: UnitPoint(x: 0.5, y: 0.6), endPoint: .top))
                    .frame(maxWidth: maxwidth, maxHeight: tabHeight)


                crystalAnimation(width: width)
                    .offset(CGSize(width: 0, height: -15))
                    .zIndex(11)
                    .isHidden(!(transparencyAnimationCount != 0  || settings.transparent || transparencyOn), remove: true)

                HStack(spacing: 0) {

                    Spacer(minLength: 0)
                    
                    faviconAsyncImage(url: url, index: navigationState.selectedWebIndex)
                        .padding(.bottom, 4)


                    Text(title)
                        .font(.system(size: 11.5, weight: .light))
                        .foregroundColor(incognito ? .white : .black)
                        .lineLimit(1)
                        .truncationMode(.tail)
                        .layoutPriority(-10)
                        .padding(.bottom, 4)

//                    TextField
                    Spacer(minLength: 0)

                    Button {
                        deleteWebView(index: navigationState.selectedWebIndex)
                    } label: {
                        ZStack {
                            Image(systemName: "xmark")
                                .font(Font.system(size: 9))
                                .foregroundColor((incognito ? greenDark : green))
                                .brightness(incognito ? 0 : -0.2)
                            Circle().fill(.clear).frame(width: 15, height: 15)
                        }
                    }.buttonStyle(XAnimatedStyle(animations: settings.animations))
                        .padding(.trailing, 4)
                        .padding(.leading, 6)
                        .padding(.bottom, 5)
                        .layoutPriority(2)
                        .keyboardShortcut("w", modifiers: [.command])
                        .help("Close tab")

                }.frame(maxWidth: maxwidth, maxHeight: 20)
                    .padding([.leading, .trailing], 6)

            }

            Taper(left: false, incognito: incognito)
                .frame(width: radius, height: radius)
        
        }.padding([.leading, .trailing], -radius)
            .offset(x: (draggingIndex == navigationState.selectedWebIndex) ? getDragX() : 0, y: (draggingIndex == navigationState.selectedWebIndex) ? (loc.y == 0 ? 0 : loc.y - 20) : 0)
            .animation((draggingIndex == navigationState.selectedWebIndex && settings.animations) ? .easeInOut(duration: 0.25) : nil, value: dragEnd)
            .frame(/*minWidth: 150.0, */maxWidth: maxwidth)
//            .layoutPriority(-1)

        return view.zIndex(1)
            .gesture(
                DragGesture()
                    .updating($loc) { currentState, pastLocation, transaction in
                        pastLocation.x = currentState.translation.width
                        if settings.animations {
                            transaction.animation = .easeInOut(duration: 0.25)
                        }
                    }
                    .onChanged { currentState in
                        if let index = navigationState.selectedWebIndex {
                            var map:[CGFloat] = [0.0]
                            for i in 0..<navigationState.webViews.count {
                                if i == navigationState.selectedWebIndex {
                                    map.append(tabSpace(true) - 1 + map[map.count-1])
                                } else {
                                    map.append(tabSpace() - 1 + map[map.count-1])
                                }
                            }

                            var newIndex:Int = 0
                            while (currentState.location.x + map[index] > map[newIndex+1] && newIndex < map.count - 2) {
                                newIndex += 1
                            }


                            draggingIndex = index
                            if newIndex < 0 {
                                newIndex = 0
                            } else if newIndex > navigationState.webViews.count - 1 {
                                newIndex = navigationState.webViews.count - 1
                            }
                            withAnimation(settings.animations ? .spring() : nil) {
                                targetLoc = newIndex
                            }

                        }
                    }
                    .onEnded { endState in
                        if let index = navigationState.selectedWebIndex {
                            searchSuggestions = false
                            focus = false

                            var map:[CGFloat] = [0.0]
                            for i in 0..<navigationState.webViews.count {
                                if i == navigationState.selectedWebIndex {
                                    map.append(tabSpace(true) - 1 + map[map.count-1])
                                } else {
                                    map.append(tabSpace() - 1 + map[map.count-1])
                                }
                            }

                            var newIndex:Int = 0
                            while (endState.location.x + map[index] > map[newIndex+1] && newIndex < map.count - 2) {
                                newIndex += 1
                            }

                            if newIndex < 0 {
                                newIndex = 0
                            } else if newIndex > navigationState.webViews.count - 1 {
                                newIndex = navigationState.webViews.count - 1
                            }

                            let edge = (newIndex > index) ? 1 : 0
                            pos = map[newIndex + edge] - map[index + edge]

                            dragEnd = true

                            if newIndex - index != 0 {

                                switchDragEnd = true
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                                    targetLoc = -1
                                    draggingIndex = -1

                                    if newIndex < index {
                                        for i in (newIndex..<index).reversed() {
                                            navigationState.webViews.swapAt(i, i+1)
                                        }
                                    } else {
                                        for i in (index..<newIndex) {
                                            navigationState.webViews.swapAt(i, i+1)
                                        }
                                    }

                                    navigationState.selectedWebIndex = newIndex

                                    switchDragEnd = false

                                }
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                                dragEnd = false
                                targetLoc = -1
                                draggingIndex = -1
                            }
                        }
                    }
            )
    }

    func getDragX(unselected: Bool = false) -> CGFloat {
        if dragEnd {
            return pos

        } else if !unselected {
            return loc.x
        } else {
            return loc2.x
        }
    }

    func otherTabBuilder(title: String, url:URL?, index:Int) -> some View {

        let width = tabSpace()
        let maxwidth = tabWidth

        let view = ZStack(alignment: .bottom) {
            Rectangle()
                .fill(.clear)
                .frame(maxWidth: maxwidth, maxHeight: tabHeight)
                .contentShape(Rectangle())

            Rectangle()
                .fill(.clear)
                .frame(maxWidth: maxwidth, maxHeight: 26)
                .overlay(
                    Rectangle().fill(.gray).frame(width: 1, height: 17, alignment: .leading), alignment: .leading)
                .overlay(Rectangle().fill(.gray).frame(width: 1, height: 17, alignment: .trailing), alignment: .trailing)
            HStack(spacing: 0) {

                Spacer(minLength: 0)

                faviconAsyncImage(url: url, index: index)
                    .padding(.bottom, 4)


                Text(title)
                    .font(.system(size: 11.5, weight: .light))
                    .foregroundColor(incognito ? .white : .black)
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .layoutPriority(-10)
                    .padding(.bottom, 4)

                Spacer(minLength: 0)


                Button {
                    deleteWebView(index: index)
                } label: {
                    ZStack {
                        Image(systemName: "xmark")
                            .font(Font.system(size: 9))
                            .foregroundColor((incognito ? greenDark : green))
                            .brightness(incognito ? 0 : -0.2)
                        Circle().fill(.clear).frame(width: 15, height: 15)
                    }
                }.buttonStyle(XAnimatedStyle(animations: settings.animations))
                    .highPriorityGesture(TapGesture()
                        .onEnded { _ in
                            deleteWebView(index: index)
                        })
                    .padding(.trailing, 4)
                    .padding(.leading, 6)
                    .padding(.bottom, 5)
                    .layoutPriority(2)
                    .zIndex(5)
                    .help("Close tab")
                    .isHidden(!(width > 65), remove: true)

            }.frame(maxWidth: maxwidth, maxHeight: 20)
                .padding([.leading, .trailing], 6)
            .zIndex(2)
        }
        .frame(maxWidth: maxwidth)
        .modifier(Tab(incognito: incognito, animations: settings.animations))
        .offset(x: (draggingIndex == index) ? getDragX(unselected: true) : 0, y: (draggingIndex == index) ? (loc2.y == 0 ? 0 : loc2.y - 20) : 0)
        .animation((draggingIndex == index && settings.animations) ? .easeInOut(duration: 0.25) : nil, value: dragEnd)


        return view
            .gesture(
                DragGesture()
                    .updating($loc2) { currentState, pastLocation, transaction in
                        pastLocation.x = currentState.translation.width
                        if settings.animations {
                            transaction.animation = .easeInOut(duration: 0.25)
                        }
                    }
                    .onChanged { currentState in

                        var map:[CGFloat] = [0.0]
                        for i in 0..<navigationState.webViews.count {
                            if i == navigationState.selectedWebIndex {
                                map.append(tabSpace(true) - 1 + map[map.count-1])
                            } else {
                                map.append(tabSpace() - 1 + map[map.count-1])
                            }
                        }

                        var newIndex:Int = 0
                        while (currentState.location.x + map[index] > map[newIndex+1] && newIndex < map.count - 2) {
                            newIndex += 1
                        }

                        draggingIndex = index

                        if newIndex < 0 {
                            newIndex = 0
                        } else if newIndex > navigationState.webViews.count - 1 {
                            newIndex = navigationState.webViews.count - 1
                        }
                        withAnimation(settings.animations ? .spring() : nil) {
                            targetLoc = newIndex
                        }

                    }
                    .onEnded { endState in
                        searchSuggestions = false
                        focus = false

                        var map:[CGFloat] = [0.0]
                        for i in 0..<navigationState.webViews.count {
                            if i == navigationState.selectedWebIndex {
                                map.append(tabSpace(true) - 1 + map[map.count-1])
                            } else {
                                map.append(tabSpace() - 1 + map[map.count-1])
                            }
                        }

                        var newIndex:Int = 0
                        while (endState.location.x + map[index] > map[newIndex+1] && newIndex < map.count - 2) {
                            newIndex += 1
                        }

                        if newIndex < 0 {
                            newIndex = 0
                        } else if newIndex > navigationState.webViews.count - 1 {
                            newIndex = navigationState.webViews.count - 1
                        }

                        let edge = (newIndex > index) ? 1 : 0
                        pos = map[newIndex + edge] - map[index + edge]
                        dragEnd = true

                        if newIndex - index != 0 {

                            switchDragEnd = true
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                                targetLoc = -1
                                draggingIndex = -1

                                if newIndex < index {
                                    for i in (newIndex..<index).reversed() {
                                        navigationState.webViews.swapAt(i, i+1)
                                    }
                                } else {
                                    for i in (index..<newIndex) {
                                        navigationState.webViews.swapAt(i, i+1)
                                    }
                                }

                                if let curr = navigationState.selectedWebIndex {
                                    if newIndex > index && curr <= newIndex && curr > index {
                                        navigationState.selectedWebIndex = curr - 1
                                    } else if newIndex < index && curr >= newIndex && curr < index {
                                        navigationState.selectedWebIndex = curr + 1
                                    }
                                }

                                switchDragEnd = false

                            }
                        }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                            dragEnd = false
                            targetLoc = -1
                            draggingIndex = -1
                        }

                    }
                    .simultaneously(with: TapGesture()
                        .onEnded { _ in
                            switchTab(index: index)
                        })
        )
    }

    func switchTab(index:Int) {

        if index < 0 || index >= navigationState.webViews.count || tabToClose != -1 {return}
//        withAnimation(settings.animations ? .easeInOut : nil) {
        navigationState.selectedWebIndex = index
//        navigationState.webViews[index] = navigationState.webViews[index]
        navigationState.manualURLStringUpdate()
        //        rerollCrystalSeed()
        searchSuggestions = false
        focus = false
        navigationState.webViews[index].shouldBecomeFirstResponder = true
//        }
    }


    @ViewBuilder
    func faviconAsyncImage(url:URL?, index:Int?) -> some View {

        if let index = index {
            if index < navigationState.webViews.count && index >= 0 {
                if (navigationState.webViews[index].load && navigationState.webViews[index].isLoading) {
                    Group {
//                        LoadingAnimation(width: 7, height: 7, maxRadius: 6, count: 3, time: 1.35, incognito: incognito, iterations: 21, animations: true)
                        BasicLoadingAnimation(incognito: incognito)
                            .frame(width: 13, height: 13)
                    }.frame(minWidth: 0, maxWidth: 27, minHeight: 17, maxHeight: 17)
                        .layoutPriority(0)
                } else if (!navigationState.webViews[index].new) {
                    let size = "256"
                    if let u = url {
                        let s = "https://www.google.com/s2/favicons?sz=\(size)&domain=\(u.absoluteString)"
                        Group {
                            WebImage(url: URL(string: s))
                                .resizable()
                                .placeholder {
                                    Image(systemName: "globe.americas.fill")
                                        .font(.system(size: 12))
                                        .foregroundColor(incognito ? greenDark : green)
                                        .colorInvert()
                                        .brightness(incognito ? 0.3 : 0)
                                }
                                .frame(width: 17, height: 17)
                                .layoutPriority(-1)
                                .scaledToFill()
                                .frame(minWidth: 0, maxWidth: 17, minHeight: 17, maxHeight: 17)
                                .clipped()
                                .padding(.bottom, 0)
                                .padding(.leading, 4)
                                .padding(.trailing, 6)
                        }.frame(minWidth: 0, maxWidth: 27, minHeight: 17, maxHeight: 17)
                            .layoutPriority(0)
                    }
                }
            }
        }
    }


//
//    func domainFormatter() -> some View {
//
//        let str = unwrappedView()?.domain ?? navigationState.urlString
//
//        var secondi:String.Index? = nil
//        var thirdi:String.Index? = nil
//
//        if let firstIndex = str.firstIndex(of: "/") {
//            if let secondIndex = str[str.index(firstIndex, offsetBy: 1)..<str.endIndex].firstIndex(of: "/") {
//                secondi = secondIndex
//                if let thirdIndex = str[str.index(secondIndex, offsetBy: 1)..<str.endIndex].firstIndex(of: "/") {
//                    thirdi = thirdIndex
//                }
//            }
//        }
//
//        if let second = secondi {
//            if let third = thirdi {
//
//                let t1:Text = Text(String(str[str.startIndex...second]))
//                    .font(.system(size: domainFont, weight: .light))
//                    .foregroundColor(incognito ? Color(white: 0.5) : Color(white: 0.7))
//                let t2:Text = Text(String(str[str.index(second, offsetBy: 1)..<third]))
//                    .font(.system(size: domainFont, weight: .light))
//                    .foregroundColor(incognito ? .white : .black)
//                let t3:Text = Text(String(str[third..<str.endIndex]))
//                    .font(.system(size: domainFont, weight: .light))
//                    .foregroundColor(incognito ? Color(white: 0.5) : Color(white: 0.7))
//                return (t1 + t2 + t3).fixedSize().isHidden(false)
//            }
//        }
//        return Text("").fixedSize().isHidden(true, remove: true)
//    }


    func rerollCrystalSeed() {
        let width = tabSpace(true)

        let height = tabHeight

        let maxRadius = 50.0

        seed = []

        for _ in 0...15 {
            let center = CGPoint(x: Double.random(in: 0...width), y: Double.random(in: 0...height))
            let a1:Double = Double.random(in: 0..<2 * Double.pi)
            let a3:Double = Double.random(in: 0..<2 * Double.pi)
            let a2:Double = Double.random(in: 0..<2 * Double.pi)
            let r1 = Double.random(in: 0..<maxRadius)
            let r2 = Double.random(in: 0..<maxRadius)
            let r3 = Double.random(in: 0..<maxRadius)
            let triangle = [CGPoint(x: center.x + r1 * sin(Double(a1)), y: center.y + r1 * cos(Double(a1))), CGPoint(x: center.x + r2 * sin(Double(a2)), y: center.y + r2 * cos(Double(a2))), CGPoint(x: center.x + r3 * sin(Double(a3)), y: center.y + r3 * cos(Double(a3)))]
            seed.append(triangle)
        }
    }


    func crystalAnimation(width:CGFloat) -> some View {

        let height = tabHeight

        return ZStack {
            ForEach(Array(seed.enumerated()), id: \.offset) { index, triangle in
                ZStack {
                    GeometryReader { geometry in
                        Path { path in

                            path.move(to: triangle[0])
                            path.addLine(to: triangle[1])
                            path.addLine(to: triangle[2])

                            path.closeSubpath()
                        }
                        .fill(transparencyOn ? (incognito ? greenDark : green).opacity((tabHeight - triangle[0].y)  / tabHeight) : .clear)
                        .brightness(CGFloat(incognito ? 1 : -1) * ((tabHeight - triangle[1].y)  / tabHeight))

                    }.frame(maxWidth: width, maxHeight: height)
                        .animation((settings.animations) ? .easeInOut(duration: 0.4).delay((transparencyOn ? 0.3 : 0) + (transparencyOn ? triangle[2].y : tabHeight - triangle[2].y)/80.0) : nil, value: transparencyOn)

                    GeometryReader { geometry in
                        Path { path in

                            path.move(to: triangle[0])
                            path.addLine(to: triangle[1])
                            path.addLine(to: triangle[2])

                            path.closeSubpath()
                        }
                        .trim(from: 0, to: transparencyOn ? 1 : 0)
                        .stroke(transparencyOn ? (incognito ? greenDark : green).opacity((tabHeight - triangle[0].y)  / tabHeight) : .clear)
                        .brightness(CGFloat(incognito ? 1 : -1) * ((tabHeight - triangle[1].y)  / tabHeight))

                    }.frame(maxWidth: width, maxHeight: height)
                        .animation((settings.animations) ? .easeInOut(duration: 0.5).delay((transparencyOn ? 0 : 0.3) + (transparencyOn ? triangle[2].y : tabHeight - triangle[2].y)/160.0) : nil, value: transparencyOn)

                }


            }
        }.frame(maxWidth: width, maxHeight: height)

    }
}


//from: https://developer.apple.com/forums/thread/125183
struct VisualEffectBackground: NSViewRepresentable {
    private let material: NSVisualEffectView.Material
    private let blendingMode: NSVisualEffectView.BlendingMode
    private let isEmphasized: Bool
    private let dark: Bool

    init(
        material: NSVisualEffectView.Material, blendingMode: NSVisualEffectView.BlendingMode, emphasized: Bool, dark:Bool) {
        self.material = material
        self.blendingMode = blendingMode
        self.isEmphasized = emphasized
        self.dark = dark
    }

    func makeNSView(context: Context) -> NSVisualEffectView {
        let view = NSVisualEffectView()

        // Not certain how necessary this is
        view.autoresizingMask = [.width, .height]

        return view
    }

    func updateNSView(_ nsView: NSVisualEffectView, context: Context) {
        nsView.material = material
        nsView.blendingMode = blendingMode
        nsView.isEmphasized = isEmphasized
        nsView.appearance = NSAppearance(named: dark ? .vibrantDark : .vibrantLight)
        
    }
}


struct Taper: View {

    var left:Bool
    var incognito:Bool

    var body: some View {
        GeometryReader { geometry in
            Path { path in

                let w = geometry.size.width
                let h = geometry.size.height

                path.move(to: CGPoint(x: left ? w : 0, y: 0))
                path.addLine(to: CGPoint(x: left ? w : 0, y: h))
                path.addLine(to: CGPoint(x: left ? 0 : w, y: h))

                if left {
                    path.addArc(center: CGPoint(x: 0, y: 0), radius: h, startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 0), clockwise: true)
                } else {
                    path.addArc(center: CGPoint(x: w, y: 0), radius: h, startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 180), clockwise: false)
                }

            }
            .fill((incognito ? whiteDark : whiteLight))
        }
    }
}


struct Tab: ViewModifier {

    @State var hover = false
    var incognito:Bool
    var animations:Bool

    func body(content: Content) -> some View {
        content
            .background(Color(white: incognito ? 0.3 : 1, opacity: hover ? /*0.5*/0.6 : 0))
            .animation(
                (animations) ? .easeInOut(duration: 0.1) : nil,
                value: hover
            )
            .mask(LinearGradient(gradient: Gradient(stops: [Gradient.Stop(color: (incognito ? whiteDark : whiteLight), location: 0.3), Gradient.Stop(color: .clear, location: 1),]), startPoint: .bottom, endPoint: UnitPoint(x: 0.5, y: 0)))
            .onHover { over in
                self.hover = over
            }
    }
}


class ParserDelegate : NSObject, XMLParserDelegate {

    @Binding var urls:[(String, URL, AnyView)]

    var temp: [(String, URL, AnyView)] = []
    var prefix: [(String, URL, AnyView)]


    init(urls: Binding<[(String, URL, AnyView)]>, bufferedPrefix:[(String, URL, AnyView)]) {
        self._urls = urls
        self.prefix = bufferedPrefix
    }

    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        for (_, attr_val) in attributeDict {

            let view = Image(systemName: "magnifyingglass")
                .font(Font.system(size: 12))
                .foregroundColor(.gray)

            if !prefix.contains(where: { $0.0 == attr_val + " - Google Search" }) {
                if attr_val != "content-type" && attr_val != "text/html; charset=utf-8" {
                    if !attr_val.hasSuffix(" - Google Search") {
                        temp.append((attr_val, URL(string: "about:blank")!, AnyView(view)))
                    }
                }
            }

        }

    }

    func process() {
        let cap = (temp.count < 7 - prefix.count) ? temp.count : 7 - prefix.count
        urls = prefix + Array(temp.prefix(upTo: cap))

    }

}




struct SuggestionStyle: ButtonStyle {

    @State var hover = false
    var selected:Bool
    var incognito:Bool
    var animations:Bool

    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .background(configuration.isPressed ? (incognito ? Color(white: 0.3) : Color(white: 0.92)) : (hover || selected ? (incognito ? Color(white: 0.25) : Color(white: 0.96)) : (incognito ? Color(white: 0.2) : whiteLight)))
            .animation(
                animations ? .easeInOut(duration: 0.05) : nil,
                value: hover
            )
            .onHover { over in
                self.hover = over
            }
            .mask(
                HStack(spacing: 0) {
                    Rectangle()
                        .fill((incognito ? whiteDark : whiteLight))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)

                    Rectangle()
                        .fill(
                            LinearGradient(gradient: Gradient(stops: [Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight), location: 0), Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight).opacity(0.95), location: 0.3), Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight).opacity(0.8), location: 0.5), Gradient.Stop(color: .clear, location: 1),]), startPoint: .leading, endPoint: .trailing)
                        )
                        .frame(maxWidth: 80)
                }
            )

    }
}


class StoredData {

    static let filePath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!.appendingPathComponent("search_data.bin")

    static func saveDictionaryToFile(dictionary: OrderedDictionary<String, Search>) throws {
        let encoder = JSONEncoder()
        let data = try encoder.encode(dictionary)
        try data.write(to: filePath)
    }

    static func readDictionaryFromFile() throws -> OrderedDictionary<String, Search>? {
        do {
            let decoder = JSONDecoder()
            let data = try Data(contentsOf: filePath)
            let json = try decoder.decode(OrderedDictionary<String, Search>.self, from: data)
            
//            print("Read JSON: \(json)")
            return json
        } catch {
            print("Error reading dictionary: \(error)")
            return [:]
        }
    }

    static func set(_ value: Search, forKey: String, index: Int? = nil) {
        do {
            if var dict = try readDictionaryFromFile() {
                if let index = index {
                    dict.removeValue(forKey: forKey)
                    dict.updateValue(value, forKey: forKey, insertingAt: index)
                } else {
                    dict.updateValue(value, forKey: forKey)
                }
                try saveDictionaryToFile(dictionary: dict)
            }
        } catch {
            print("Error setting dictionary value: \(error)")
        }
    }

    static func get(forKey:String) -> Search? {
        do {
            if let dict = try readDictionaryFromFile() {
                let value = dict[forKey]
                return value
            }
        } catch {
            print("Error getting dictionary value: \(error)")
        }
        return nil
    }

    static func dictionaryRepresentation() -> OrderedDictionary<String, Search>? {
        do {
            if let dict = try readDictionaryFromFile() {
                return dict
            }
        } catch {
            print("Error getting dictionary representation: \(error)")
        }
        return nil
    }

    static func removeObject(forKey:String) {
        do {
            if var dict = try readDictionaryFromFile() {
                dict.removeValue(forKey: forKey)
                try saveDictionaryToFile(dictionary: dict)
            }
        } catch {
            print("Error removing dictionary value: \(error)")
        }
    }

    static func clearData() {
        do {
            let orderedDict:OrderedDictionary<String, Search> = [:]
            try saveDictionaryToFile(dictionary: orderedDict)
        } catch {
            print("Error clearing dictionary: \(error)")
        }
    }
}

struct Search: Codable {
    let title: String
    let priority: Int
}

//
//
//extension NSTextField {
//    open override var focusRingType: NSFocusRingType {
//            get { .none }
//            set { }
//    }
//}
//
//


struct LoadingAnimation: View {
    @State var lseed:[([CGPoint], [Double])] = []
    @State var loadingAnimation:Bool = false

    var width:CGFloat
    var height:CGFloat
    var maxRadius:CGFloat
    var count:Int
    var time:CGFloat
    var incognito:Bool
    var iterations:Int = -1
    var outline:Bool = true

    var animations:Bool

    func rerollLoadingSeed(width: CGFloat, height: CGFloat, maxRadius: CGFloat, count:Int) {
        lseed = []
        for _ in 0..<count {
            let center = CGPoint(x: Double.random(in: 0...width), y: Double.random(in: 0...height))
            let a1:Double = Double.random(in: 0..<2 * Double.pi)
            let a3:Double = Double.random(in: 0..<2 * Double.pi)
            let a2:Double = Double.random(in: 0..<2 * Double.pi)
            let r1 = Double.random(in: 0..<maxRadius)
            let r2 = Double.random(in: 0..<maxRadius)
            let r3 = Double.random(in: 0..<maxRadius)
            let triangle = [CGPoint(x: center.x + r1 * sin(Double(a1)), y: center.y + r1 * cos(Double(a1))), CGPoint(x: center.x + r2 * sin(Double(a2)), y: center.y + r2 * cos(Double(a2))), CGPoint(x: center.x + r3 * sin(Double(a3)), y: center.y + r3 * cos(Double(a3)))]

            lseed.append((triangle, [Double.random(in: 0...1), (incognito ? 1 : -1) * Double.random(in: 0...1)]))
        }

    }



    var body: some View {

        return ZStack {
            ForEach(Array(lseed.enumerated()), id: \.offset) { index, triangle in
                ZStack {
                    GeometryReader { geometry in
                        Path { path in

                            path.move(to: triangle.0[0])
                            path.addLine(to: triangle.0[1])
                            path.addLine(to: triangle.0[2])

                            path.closeSubpath()
                        }
                        .fill(loadingAnimation ? (incognito ? greenDark : green).opacity(triangle.1[0]) : .clear)
                        .brightness(triangle.1[1])

                    }.frame(maxWidth: width, maxHeight: height)
                        .animation((animations) ? getAnimation(index: index) : nil, value: loadingAnimation)
                        .onAppear {
                            loadingAnimation = true
                        }

                    GeometryReader { geometry in
                        Path { path in

                            path.move(to: triangle.0[0])
                            path.addLine(to: triangle.0[1])
                            path.addLine(to: triangle.0[2])

                            path.closeSubpath()
                        }
                        .trim(from: 0, to: loadingAnimation ? 1 : 0)
                        .stroke(loadingAnimation ? (incognito ? greenDark : green).opacity(triangle.1[0]) : .clear)
                        .brightness(triangle.1[1])
                        .isHidden(!outline, remove: true)

                    }.frame(maxWidth: width, maxHeight: height)
                        .animation((animations) ? getAnimation(index: index, forPath: true) : nil, value: loadingAnimation)
                }
            }
            .padding([.leading], width/4)
            .padding([.top], height/4)

        }.frame(maxWidth: width, maxHeight: height)
            .onAppear {
                rerollLoadingSeed(width: width/2, height: height/2, maxRadius: maxRadius, count: count)
            }
    }

    func getAnimation(index:Int, forPath:Bool = false) -> Animation? {
        let dur:Double = time + Double(index) / Double(count)

        if (iterations < 0) {
            if !forPath {
                return .easeInOut(duration: (dur*0.3)).repeatForever().delay(dur*0.7)
            }
            return .easeInOut(duration: dur).repeatForever()
        } else if (iterations == 0) {
            return nil
        } else {
            if !forPath {
                return .easeInOut(duration: dur*0.3).repeatCount(iterations).delay(dur*0.7)
            }
            return .easeInOut(duration: dur).repeatCount(iterations)
        }
    }
}

struct BasicLoadingAnimation: View {
    @State var ac1 = false

    var incognito:Bool

    var body: some View {
        GeometryReader { geometry in
            let width = geometry.size.width
            let height = geometry.size.height
            ZStack {
                Path { path in
                    path.move(to: CGPoint(x: 0, y: 0.3*height))
                    path.addLine(to: CGPoint(x: width, y: 0))
                }
                .trim(from: 0, to: ac1 ? 1 : 0)
                .stroke((incognito ? greenDark : green), lineWidth: 1)
                Path { path in
                    path.move(to: CGPoint(x: width, y: 0))
                    path.addLine(to: CGPoint(x: 0.7*width, y: height))
                }
                .trim(from: 0, to: ac1 ? 1 : 0)
                .stroke((incognito ? greenDark : green), lineWidth: 1)
                Path { path in
                    path.move(to: CGPoint(x: 0.7*width, y: height))
                    path.addLine(to: CGPoint(x: 0, y: 0.3*height))
                }
                .trim(from: 0, to: ac1 ? 1 : 0)
                .stroke((incognito ? greenDark : green), lineWidth: 1)
            }
            .colorInvert()
            .brightness(incognito ? 0.4 : 0)
            .opacity(0.7)
        }
        .animation(.easeInOut(duration: 1).repeatCount(21, autoreverses: true), value: ac1)
            .onAppear {
                ac1 = true
            }
    }
}

struct NewPage : View {

    var incognito:Bool
    var navigationState:NavigationState

    @State var intro = false

    let animTime:CGFloat = 2

    var animations:Bool
    
    func getFormattedDate() -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MMM d, yyyy"
        let currentDate = Date()
        let dateString = dateFormatter.string(from: currentDate)
        return dateString
    }

    var body: some View {
        let mainAnimation = LoadingAnimation(width: 400, height: 400, maxRadius: 250, count: 7, time: animTime/2, incognito: incognito, iterations: 1, animations: animations)

        let auxiliaryAnimation = LoadingAnimation(width: navigationState.window.frame.width, height: max(navigationState.window.frame.height - 200, 0), maxRadius: navigationState.window.frame.width / 2, count: 5, time: animTime, incognito: incognito, iterations: 1, outline: false, animations: animations)

        ZStack {

            mainAnimation

            Text(getFormattedDate()/*"Crystallization"*/)
                .font(.system(size: 45, weight: .light))
                .multilineTextAlignment(.center)
                .foregroundColor(incognito ? .white : .black)
                .shadow(color: incognito ? .black : .white, radius: 8)
                .opacity(intro ? 1 : 0)
                .animation((animations) ? .easeInOut(duration: animTime/2).delay(animTime/2) : nil, value: intro)

            mainAnimation
                .mask(
                    Text(getFormattedDate()/*"Crystallization"*/)
                        .font(.system(size: 45, weight: .light))
                        .multilineTextAlignment(.center)
                        .foregroundColor(.black)
                        .opacity(intro ? 1 : 0)
                        .animation((animations) ? .easeInOut(duration: animTime) : nil, value: intro)
                )
                .colorInvert()

        }.frame(maxWidth: .infinity, maxHeight: .infinity)
        .onAppear {
            intro = true
        }
        .background {
            auxiliaryAnimation
            .colorInvert()
            .blur(radius: 20)
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(incognito ? whiteDark : whiteLight)
        }
        .clipped()
    }
}



// from: https://stackoverflow.com/a/59228385
extension View {
    @ViewBuilder func isHidden(_ hidden: Bool, remove: Bool = false) -> some View {
        if hidden {
            if !remove {
                self.hidden()
            }
        } else {
            self
        }
    }
}



class Mutator {
    var completionUpdates = true
    var suggestUpdates = true
    var failedURL = ""
}

//
//struct FaviconImage : View {
//    var url:URL?
//    var incognito:Bool
//    @State var faviconURL:URL? = nil
//
//    var body: some View {
//        WebImage(url: faviconURL)
//            .placeholder {
//                Image(systemName: "globe.americas.fill")
//                    .font(.system(size: 12))
//                    .foregroundColor(incognito ? greenDark : green)
//                    .colorInvert()
//                    .brightness(incognito ? 0.3 : 0)
//            }
//            .resizable()
//            .task {
//                faviconURL = await getFaviconURL(url: url)
//            }
//    }
////
////    func getFaviconURL(url:URL?) async -> URL? {
////        if let url = url {
////            do {
////                let favicon = try await FaviconFinder(
////                    url: url,
////                    preferredType: .html,
////                    preferences: [
////                        .html: FaviconType.appleTouchIcon.rawValue,
////                        .ico: "favicon.ico",
////                        .webApplicationManifestFile: FaviconType.launcherIcon4x.rawValue
////                    ],
////                    downloadImage: false
////                ).downloadFavicon()
////
////                return favicon.url
////            } catch let error {
////                print("Favicon Fetch Error: \(error)")
////                return nil
////            }
////        } else {
////            return nil
////        }
////    }
//}

// from: https://stackoverflow.com/a/57715771
extension View {
    func placeholder<Content: View>(
        when shouldShow: Bool,
        alignment: Alignment = .leading,
        @ViewBuilder placeholder: () -> Content) -> some View {

            self.overlay(alignment: alignment) {
                placeholder().opacity(shouldShow ? 1 : 0).allowsHitTesting(false)
            }
        
        }
}
