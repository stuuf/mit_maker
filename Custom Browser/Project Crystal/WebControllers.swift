import SwiftUI
import WebKit
import Foundation

class MyWebView : WKWebView, ObservableObject {
    var domain = ""
    var load = false
    var new = true
    var failed = false
    var isTransferring = false
    var shouldBecomeFirstResponder = false
    var hasNewPage = true

//
//    override init(frame: CGRect, configuration: WKWebViewConfiguration) {
//        super.init(frame: frame, configuration: configuration)
//        var observer = Observer(webView: self)
//    }
//    
//    required init?(coder: NSCoder) {
//        fatalError("init(coder:) has not been implemented")
//    }
}


// adapted from: https://stackoverflow.com/a/66845387
class NavigationState : NSObject, ObservableObject {

    @Published var webViews : [MyWebView] = []
    
    var lastClosed:[URL] = []
    @Published var selectedWebIndex:Int?
    @Published var urlString:String = ""
    
    @Published var updater = false
    
    
    
    var config:WKWebViewConfiguration
    
    var window:NSWindow
    var eventMonitors:[Any] = []
        
    init(window:NSWindow, incognito:Bool, initialViews:[MyWebView] = []) {
        config = WKWebViewConfiguration()
        if incognito {
            config.websiteDataStore = WKWebsiteDataStore.nonPersistent()
        }
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")
//        config.setURLSchemeHandler(nil, forURLScheme: "webcrypto")
        
        self.window = window
        self.webViews = initialViews
        if initialViews.count > 0 {
            selectedWebIndex = 0
        }
        super.init()
    }
    
    

    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
        if let index = selectedWebIndex {
            if keyPath == #keyPath(WKWebView.canGoBack) || keyPath == #keyPath(WKWebView.canGoForward) || keyPath == #keyPath(WKWebView.url) {
                
                if let domain = webViews[index].url?.absoluteString {
                    webViews[index].domain = domain
                }
                updater.toggle()
                    
            }
        }
    }
}


extension NavigationState : WKNavigationDelegate {
    func webView(_ webView: WKWebView, didCommit navigation: WKNavigation!) {
        if let index = selectedWebIndex {
            if webView == webViews[index] {
                if let unwrapped = webView.url {
                    self.urlString = unwrapped.absoluteString
                }
            }
        }
    }
    
    func manualURLStringUpdate() {
        if let index = selectedWebIndex {
            if let unwrapped = webViews[index].url {
                self.urlString = unwrapped.absoluteString
            
            }
        }
    }
}



struct WebView2 : NSViewRepresentable {
    
    @StateObject var navigationState : NavigationState
    @Binding var loading:Bool
    

    
    var browser:Bowser
    var needsInit:Bool

    func makeNSView(context: Context) -> WKWebView  {
        let nsView = WKWebView(frame: .zero, configuration: navigationState.config)
        return nsView
    }
    
    func updateNSView(_ nsView: WKWebView, context: Context) {
        
        if let index = navigationState.selectedWebIndex {
            let webView = navigationState.webViews[index]
            if webView != nsView.subviews.first {
                nsView.subviews.forEach { $0.removeFromSuperview() }
                
                webView.frame = CGRect(origin: .zero, size: nsView.bounds.size)
                webView.navigationDelegate = context.coordinator
                webView.uiDelegate = context.coordinator

                nsView.addSubview(webView)
                if webView.shouldBecomeFirstResponder {
                    webView.window?.makeFirstResponder(webView)
                    webView.shouldBecomeFirstResponder = false
                }
                                
                if let del = navigationState.window.delegate as? WindowDelegate {
                    del.views = (webView, nsView)
                }

            }
        }
    }

    
    func makeCoordinator() -> Coordinator {
        return Coordinator(self, browser)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate, WKDownloadDelegate, WKUIDelegate {
        let parent: WebView2
        let browser: Bowser

        
        init(_ parent: WebView2, _ browser: Bowser) {
            self.parent = parent
            self.browser = browser
        }
        
        func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
            parent.loading = true
            
            
            browser.searchSuggestions = false
            browser.focus = false
            parent.navigationState.manualURLStringUpdate()
            
            if let mywebview = webView as? MyWebView {
                mywebview.load = true
                mywebview.new = false
                if let url = mywebview.url {
                    mywebview.domain = url.absoluteString
                }
                
            }
        }
        
        
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            
            parent.loading = false
            parent.navigationState.manualURLStringUpdate()
            
            if !browser.incognito {
                if let url = webView.url, url.absoluteString != "about:blank" {
                    if let dict = StoredData.dictionaryRepresentation() {
                        for key in dict.keys {
                            if let search = StoredData.get(forKey: key) {
                                if search.priority > 1 {
                                    StoredData.set(Search(title: search.title, priority: search.priority - 1), forKey: key)
                                } else {
                                    StoredData.removeObject(forKey: key)
                                }
                            }
                        }
                        
                        
                        if let search = StoredData.get(forKey: url.absoluteString) {
                            let title = search.title
                            let count = search.priority
                            let target = (count + 100 < 2000) ? count + 100 : 2000
                            var index = 0
                            for (_, value) in dict {
//                                print("looping: \(key)")
                                if value.priority > target {
                                    index += 1
                                } else {
                                    break
                                }
                            }
                            
                            StoredData.set(Search(title: title, priority: target), forKey: url.absoluteString, index: index)
//                            print("index: \(index), index forKey: \(dict.index(forKey: url.absoluteString))")
                        } else {
                            if let title = webView.title {
                                var index = 0
                                for (_, value) in dict {
                                    if value.priority > 100 {
                                        index += 1
                                    } else {
                                        break
                                    }
                                }
                                StoredData.set(Search(title: title, priority: 100), forKey: url.absoluteString, index: index)
                            }
                        }
                        if dict.keys.count > 200 {
                            for i in 150..<dict.count {
                                StoredData.removeObject(forKey: dict.keys[i])
                            }
                        }
                    }
                }
                
                
            }
            
            if let mywebview = webView as? MyWebView {
                mywebview.load = false
                mywebview.new = false
//                if let url = mywebview.url {
//                    mywebview.domain = url.absoluteString
//                }
            }
            
            
        }
        
        
        
//        func webView(_ webView: WKWebView, didReceiveServerRedirectForProvisionalNavigation navigation: WKNavigation!) {
//            print("redirect received")
//        }
//        
//        func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
//            print("terminated")
//        }
        
        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            parent.loading = false
            parent.navigationState.manualURLStringUpdate()
            
            if let mywebview = webView as? MyWebView {
                mywebview.load = false

                if let info = error._userInfo as? [String: Any] {
                    if let urlString = info["NSErrorFailingURLStringKey"] as? String {
                        browser.mutator.failedURL = urlString
                        browser.lfModal = true
                    }
                
                }
                if let url = mywebview.url {
                    mywebview.domain = url.absoluteString
                }
            }
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!) {
            parent.loading = false
            parent.navigationState.manualURLStringUpdate()
            
            if let mywebview = webView as? MyWebView {
                mywebview.load = false
                browser.mutator.failedURL = mywebview.domain
                if let url = mywebview.url {
                    mywebview.domain = url.absoluteString
                }
                browser.lfModal = true
            }
        }
        
        // from: https://stackoverflow.com/a/45604360
        public func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Swift.Void) {
            if (navigationAction.navigationType == .linkActivated) {
                if let redirectedUrl = navigationAction.request.url {
                    webView.load(URLRequest(url: redirectedUrl))
                }
                decisionHandler(.cancel)
                return
            }
            
            decisionHandler(.allow)
            
        }
        
        
        
        
        func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
//            if navigationAction.targetFrame == nil {
            parent.browser.createNewWebView(withRequest: navigationAction.request)
//            }
            return nil
        }
        
        
        
        
        // from: https://stackoverflow.com/a/68007331
        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, preferences: WKWebpagePreferences, decisionHandler: @escaping (WKNavigationActionPolicy, WKWebpagePreferences) -> Void) {
            if navigationAction.shouldPerformDownload {
                decisionHandler(.download, preferences)
            } else {
                decisionHandler(.allow, preferences)
            }
        }
        // from: https://stackoverflow.com/a/68007331
        func webView(_ webView: WKWebView, decidePolicyFor navigationResponse: WKNavigationResponse, decisionHandler: @escaping (WKNavigationResponsePolicy) -> Void) {
            if navigationResponse.canShowMIMEType {
                decisionHandler(.allow)
            } else {
                decisionHandler(.download)
            }
        }
        
        // from: https://stackoverflow.com/a/68007331
        func download(_ download: WKDownload, decideDestinationUsing response: URLResponse, suggestedFilename: String, completionHandler: @escaping (URL?) -> Void) {
                    
            let savePanel = NSSavePanel()
            savePanel.canCreateDirectories = true
            savePanel.nameFieldStringValue = suggestedFilename
            
            savePanel.begin { (result) in
                if result == NSApplication.ModalResponse.OK, let url = savePanel.url {
                    completionHandler(url)
                } else {
                    completionHandler(nil)
                }
            }
        }
    
        
        func webView(_ webView: WKWebView, navigationAction: WKNavigationAction, didBecome download: WKDownload) {
            download.delegate = self
        }
            
        func webView(_ webView: WKWebView, navigationResponse: WKNavigationResponse, didBecome download: WKDownload) {
            download.delegate = self
        }
        
        // from: https://stackoverflow.com/a/62325185
        func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters, initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
            let openPanel = NSOpenPanel()
            openPanel.canChooseFiles = true
            openPanel.begin { (result) in
                if result == NSApplication.ModalResponse.OK {
                    if let url = openPanel.url {
                        completionHandler([url])
                    }
                } else if result == NSApplication.ModalResponse.cancel {
                    completionHandler(nil)
                }
            }
        }
        
        // from: https://www.advancedswift.com/wkwebview-javascript-alerts-in-swift/
        func webView(_ webView: WKWebView,
            runJavaScriptConfirmPanelWithMessage message: String,
            initiatedByFrame frame: WKFrameInfo,
            completionHandler: @escaping (Bool) -> Void) {

            // Set the message as the NSAlert text
            let alert = NSAlert()
            alert.informativeText = message

            // Add a confirmation button “OK”
            // and cancel button “Cancel”
            alert.addButton(withTitle: "OK")
            alert.addButton(withTitle: "Cancel")

            // Display the NSAlert
            let action = alert.runModal()

            // Call completionHandler with true only
            // if the user selected OK (the first button)
            completionHandler(action == .alertFirstButtonReturn)
        }
        
        
        func webView(_ webView: WKWebView,
            runJavaScriptAlertPanelWithMessage message: String,
            initiatedByFrame frame: WKFrameInfo,
            completionHandler: @escaping () -> Void) {
            
            // Set the message as the NSAlert text
            let alert = NSAlert()
            alert.informativeText = message
            alert.addButton(withTitle: "Ok")

            // Display the NSAlert
            alert.runModal()

            // Call completionHandler
            completionHandler()
        }
        
        func webView(_ webView: WKWebView,
            runJavaScriptTextInputPanelWithPrompt prompt: String,
            defaultText: String?,
            initiatedByFrame frame: WKFrameInfo,
            completionHandler: @escaping (String?) -> Void) {

            // Set the prompt as the NSAlert text
            let alert = NSAlert()
            alert.informativeText = prompt
            alert.addButton(withTitle: "Submit")

            // Add an input NSTextField for the prompt
            let inputFrame = NSRect(
                x: 0,
                y: 0,
                width: 300,
                height: 24
            )

            let textField = NSTextField(frame: inputFrame)
            textField.placeholderString = ("Your input")
            alert.accessoryView = textField

            // Display the NSAlert
            alert.runModal()

            // Call completionHandler with
            // the user input from textField
            completionHandler(textField.stringValue)
        }
        
    }
}
