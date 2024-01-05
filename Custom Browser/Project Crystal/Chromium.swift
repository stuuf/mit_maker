//import SwiftUI
//import WebKit
//import Foundation
//import Introspect
//import SDWebImageSwiftUI
//
//// REALISTIC BUT SUCKY:
//// Improve performance
//// Refactor search completion system to consider title as well and be less confusing (with the switch around + " - Google Search" stuff
//
//// LONG SHOTS:
//// Figure out how to get modern looking favicons
//// Implement full screen functionality (probably impossible)
//// Full dragging capabilities
//
//
//let bg = Color(red: 242.0 / 255, green: 237.0 / 255, blue: 225.0/255)
//let green = Color(red: 14/255.0, green: 173/255.0, blue: 155/255.0)
//let turquoise = Color(red: 14/255.0, green: 173/255.0, blue: 155/255.0)
//let greenTurquoise = Color(red: 26/255.0, green: 201.5/255.0, blue: 77.5/255.0)
//
//let bgDark = Color(red: 36/255.0, green: 35/255.0, blue: 32/255.0)
//let greenDark = Color(red: 38.0/255, green: 230.0/255, blue: 0/255.0)
//let turquoiseDark = Color(red: 38.0/255, green: 230.0/255, blue: 0/255.0)
//
//let whiteDark = Color(white: 0.3)
//let whiteLight = Color.white
//
//
//
//
//struct Bowser: View {
//    
//    @State var updater: Bool = false
//    @StateObject var navigationState:NavigationState
//    @State var loading:Bool = false
//    @State var loadingAnimation = false
//    
//    @ObservedObject var settings:Settings
//    
//    @State var seed:[[CGPoint]] = []
//    @State var transparencyAnimationCount = 0
//    @State var transparencyOn:Bool
//    
//    @FocusState var focus:Bool {
//        didSet {
//            searchSuggestions = false
//            selectionNum = -1
//        }
//    }
//    @State var domainModified = false
//    
//    //dragging controls
//    @State var pos = 0
//    @GestureState var loc = CGPoint(x:0, y:0)
//    @GestureState var loc2 = CGPoint(x:0, y:0)
//    @State var dragEnd = false
//    @State var switchDragEnd = false
//    @State var targetLoc = -1
//    @State var draggingIndex = -1
//    
//    
//    @State var searchSuggestions = false
//    @State var suggestionList:[(String, URL, AnyView)] = []
//    @State var selectionNum = -1
//    @State var completion = ""
//    @State var completionOn:Bool = false
//    
//    
//    @State var transferAnimation = false
//    @State var transferList:[(String, Int)] = []
//    
//    var incognito:Bool
//    var parent:AppDelegate
//    var mutator = Mutator()
//    
//    let i = 0
//    
//    @State var cookieClearConfirmation = false
//    @State var searchClearConfirmation = false
//    
//    @State var willClose = false
//    @State var tabToClose = -1
//    
//    
//    var body: some View {
//        
//        return VStack (spacing: 0) {
//            
//            HStack(alignment: .bottom, spacing: -1) {
//                SwiftUI.ForEach(Array(navigationState.webViews.enumerated()), id: \.offset) { index, tab in
//                    completeTabBuilder(i: index, currentIndex: draggingIndex)
//                }
//
//                Button {
//                    searchSuggestions = false
//                    focus = false
//                    createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true)
//                } label: {
//                    Image(systemName: "plus")
//                        .font(Font.system(size: 13))
//                        .foregroundColor((incognito ? greenDark : green))
//                }.buttonStyle(AnimatedStyle())
//                    .padding([.leading, .trailing], 10)
//                    .padding(.bottom, 7)
//                    .keyboardShortcut("t", modifiers: [.command])
//
//                Button {
//                    if navigationState.lastClosed.count > 0 {
//                        searchSuggestions = false
//                        focus = false
//                        let request = URLRequest(url: navigationState.lastClosed[navigationState.lastClosed.count - 1])
//                        navigationState.lastClosed.removeLast()
//                        createNewWebView(withRequest: request)
//                    }
//                } label: {
//
//                }.hidden()
//                    .keyboardShortcut("t", modifiers: [.command, .shift])
//
//                Spacer()
//            }
//            .frame(maxWidth: .infinity)
//            .background((incognito ? bgDark : bg).dragHandle())
//
//            VStack {
//                HStack {
//                    Button {
//                        if let index = navigationState.selectedWebIndex {
//                            navigationState.webViews[index].goBack()
//                        }
//                    } label: {
//                        if let index = navigationState.selectedWebIndex {
//                            Image(systemName: "arrow.left")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(navigationState.webViews[index].canGoBack ? (incognito ? greenDark : green) : Color(white: 0.7).opacity(0.5))
//                        } else {
//                            Image(systemName: "arrow.left")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(Color(white: 0.7).opacity(0.8))
//                        }
//                    }.buttonStyle(AnimatedStyle(disabled: navigationState.selectedWebIndex.map { !navigationState.webViews[$0].canGoBack } ?? false))
//                    Button {
//                        if let index = navigationState.selectedWebIndex {
//                            navigationState.webViews[index].goForward()
//                        }
//                    } label: {
//                        if let index = navigationState.selectedWebIndex {
//                            Image(systemName: "arrow.right")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(navigationState.webViews[index].canGoForward ? (incognito ? greenDark : green) : Color(white: 0.7).opacity(0.5))
//                        } else {
//                            Image(systemName: "arrow.right")
//                                .font(Font.system(size: 13))
//                                .foregroundColor(Color(white: 0.7).opacity(0.8))
//                        }
//                    }.buttonStyle(AnimatedStyle(disabled: navigationState.selectedWebIndex.map { !navigationState.webViews[$0].canGoForward } ?? false))
//
//                    Button {
//                        if loading {
//                            if let index = navigationState.selectedWebIndex {
//                                navigationState.webViews[index].stopLoading()
//                                loading = false
//                                loadingAnimation = false
//                            }
//                        } else {
//                            if let index = navigationState.selectedWebIndex {
//                                navigationState.webViews[index].reload()
//                            }
//                        }
//                    } label: {
//                        Image(systemName: (loading) ? "xmark" : "arrow.clockwise")
//                            .font(Font.system(size: 13))
//                            .foregroundColor((incognito ? greenDark : green))
//                    }.buttonStyle(AnimatedStyle())
//                        .padding(.leading, 3)
//
//
//                    Button {
//                        focus = true
//                    } label: {
//
//                    }.opacity(0)
//                        .frame(width: 0, height: 0)
//                        .keyboardShortcut("l", modifiers: [.command])
////
//
//                    TextField(
//                        "",
//                        text: unwrappedBindingView()?.domain ?? $navigationState.urlString
//                    )
//                    .focused($focus)
//                    .textFieldStyle(.plain)
//                    .padding(EdgeInsets(top: 4, leading: 12, bottom: 4, trailing: 20))
//                    .background(VisualEffectBackground(material: incognito ? .sidebar : .titlebar, blendingMode:  .behindWindow, emphasized: false, dark: incognito).opacity(1).overlay((incognito ? Color(white: 0.2) : whiteLight).opacity(focus ? 1 : (0.6))))
//                    .cornerRadius(12)
//                    .disableAutocorrection(true)
//                    .foregroundColor(incognito ? .white : .black)
//                    .overlay(alignment: .leading) {
//                        if !focus {
//                            domainFormatter()
//                                .padding(.leading, 12)
//                                .allowsHitTesting(false)
//                        } else {
//                            ZStack(alignment: .leading) {
//                                RoundedRectangle(cornerRadius: 12)
//                                    .stroke((incognito ? greenDark : green))
//
//                                highlightedCompletion().padding(.leading, 10).isHidden(!(searchSuggestions && completionOn && completion.count > 0), remove: true)
//                            }
//                        }
//                    }
//                    .background(alignment: .topLeading) {
//                        SearchSuggestions().isHidden(!(searchSuggestions && focus), remove: true)
//                    }
//                    .font(.system(size: 13, weight: .light))
//                    .onSubmit {
//
//                        var domain:String = "about:blank"
//                        let search = (unwrappedView()?.domain ?? navigationState.urlString)
//
//                        if search.contains(" ") {
//                            let encodedTerm = search.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
//                            if let encodedTerm = encodedTerm {
//                                domain = "https://www.google.com/search?q=\(encodedTerm)"
//                            }
//                        } else {
//                            if search == "about:blank" {
//                                domain = search
//                            } else if String(search.prefix(8)) == "https://" || String(search.prefix(7)) == "http://" {
//                                domain = search
//                            } else if hasTLD(search) {
//                                var prefix = ""
//                                if String(search.prefix(4)) != "www." {
//                                    prefix += "www."
//                                }
//                                domain = "https://" + prefix + search
//                            } else {
//                                let encodedTerm = search.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
//                                if let encodedTerm = encodedTerm {
//                                    domain = "https://www.google.com/search?q=\(encodedTerm)"
//                                }
//                            }
//                        }
//
//
//                        if (completionOn && searchSuggestions && completion.count > 0 && suggestionList.count > 0) {
//                            if suggestionList[0].1.absoluteString != "about:blank" {
//                                domain = suggestionList[0].1.absoluteString
//                            } else {
//                                let encodedTerm = stripGoogleSearchSuffix(str: suggestionList[0].0).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
//                                if let encodedTerm = encodedTerm {
//                                    domain = "https://www.google.com/search?q=\(encodedTerm)"
//                                }
//                            }
//                        }
//
//                        focus = false
//
//                        if let unwrapped = URL(string: domain) {
//                            if search.count > 0 {
//                                let request = URLRequest(url: unwrapped)
//                                if let index = navigationState.selectedWebIndex {
//
//                                    navigationState.webViews[index].load(request)
//                                    navigationState.webViews[index].new = false
//                                    navigationState.webViews[index].domain = domain
//
//                                }
//                            }
//                        }
//                    }
//                    .onChange(of: (unwrappedView()?.domain ?? navigationState.urlString)) { newValue in
//                    
//                        if focus {
//                            searchSuggestions = true
//                            if mutator.suggestUpdates {
//                                updateSuggestions(linkOnly: isLink(unwrappedView()?.domain ?? navigationState.urlString))
//                                selectionNum = -1
//                            } else {
//                                mutator.suggestUpdates = true
//                            }
//                        } else {
//                            searchSuggestions = false
//                        }
//                    }
//                    .introspectTextField { textField in
//                        if let t = textField.currentEditor() as? NSTextView {
//                            t.insertionPointColor = completionOn && searchSuggestions && completion.count > 0 ? .clear : (incognito ? .white : .black)
//                            if completionOn && searchSuggestions && completion.count > 0 {
//                                t.updateInsertionPointStateAndRestartTimer(true)
//                            }
//                        }
//                    }
//
//                    Button {
//                        cookieClearConfirmation = true
//                    } label: {
//                        Image(systemName: "circle.hexagongrid.circle.fill")
//                            .font(Font.system(size: 13))
//                            .foregroundColor(.orange)
//                    }.buttonStyle(AnimatedStyle())
//                        .confirmationDialog(
//                            "Do you want to clear all cookies for this browser?",
//                            isPresented: $cookieClearConfirmation
//                        ) {
//                            Button("Yes") {
//                                HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)
//
//                                WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
//                                    records.forEach { record in
//                                        WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
//                                    }
//                                }
//                            }
//                        }
//
//                    Button {
//                        searchClearConfirmation = true
//                    } label: {
//                        Image(systemName: "trash")
//                            .font(Font.system(size: 13))
//                            .foregroundColor(.red)
//                    }.buttonStyle(AnimatedStyle())
//                        .confirmationDialog(
//                            "Do you want to clear all search history for this browser?",
//                            isPresented: $searchClearConfirmation
//                        ) {
//                            Button("Yes") {
//                                StoredData.clearData()
//                            }
//                        }
//
//                    Button {
//                        parent.createWindow(offset: 20)
//                    } label: {
//                        Image(systemName: "plus.rectangle.on.rectangle")
//                            .font(Font.system(size: 13))
//                            .foregroundColor(green)
//                    }.buttonStyle(AnimatedStyle())
//                        .keyboardShortcut("n", modifiers: [.command])
//
//                    Button {
//                        parent.createWindow(incognito: true, offset: 20)
//                    } label: {
//                        Image(systemName: "eyeglasses")
//                            .font(Font.system(size: 13))
//                            .foregroundColor(greenDark)
//                    }.buttonStyle(AnimatedStyle())
//                        .keyboardShortcut("n", modifiers: [.command, .shift])
//
//                }
//                .padding(10)
//                .background((incognito ? whiteDark : whiteLight))
//
//                ZStack {
//                    NewPage(incognito: incognito, navigationState: navigationState, animations: $settings.animations).zIndex(-1)
//                        .isHidden(!(unwrappedView()?.new ?? true), remove: true)
//
//                    
//                    WebView2(navigationState: navigationState, loading: $loading, loadingAnimation: $loadingAnimation, browser: self, needsInit: navigationState.selectedWebIndex != nil)
//                        .clipped()
//                        .zIndex(-2)
//                }
//                .zIndex(-1)
//                
//            }.background((incognito ? whiteDark : whiteLight))
//        }.background((incognito ? bgDark : bg))
//            .onAppear {
//                if navigationState.selectedWebIndex == nil {
//                    DispatchQueue.main.async {
//                        createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true)
//                    }
//                } else {
//                    DispatchQueue.main.async {
//                        createNewWebView(withRequest: URLRequest(url: URL(string: "https://www.google.com")!), noLoad: true)
//                        deleteWebView(index: navigationState.webViews.count - 1)
//                    }
//                }
//                rerollCrystalSeed()
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
//                navigationState.eventMonitors.append(NSEvent.addLocalMonitorForEvents(matching: [.keyDown]) { nsevent in
//                    var returnNil = false
//                    if nsevent.windowNumber == navigationState.window.windowNumber {
//                        if focus {
//                            if nsevent.keyCode == 125 { // down
//                                selectionNum = selectionNum < suggestionList.count - 1 && selectionNum >= 0 ? selectionNum + 1 : 0
//                                mutator.suggestUpdates = false
//                                completionOn = false
//                                if searchSuggestions && suggestionList.count > 0 {
//                                    if suggestionList[selectionNum].1.absoluteString != "about:blank" {
//                                        if let v = unwrappedView() {
//                                            v.domain = suggestionList[selectionNum].1.absoluteString
//                                        } else {
//                                            navigationState.urlString = suggestionList[selectionNum].1.absoluteString
//                                        }
//                                    } else {
//                                        if let v = unwrappedView() {
//                                            v.domain = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
//                                        } else {
//                                            navigationState.urlString = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
//                                        }
//                                    }
//                                }
//                            } else if nsevent.keyCode == 126 { // up
//                                selectionNum = selectionNum > 0 && selectionNum <= suggestionList.count - 1 ? selectionNum - 1 : suggestionList.count - 1
//                                mutator.suggestUpdates = false
//                                completionOn = false
//                                if searchSuggestions && suggestionList.count > 0 {
//                                    returnNil = true
//
//                                    if suggestionList[selectionNum].1.absoluteString != "about:blank" {
//                                        if let v = unwrappedView() {
//                                            v.domain = suggestionList[selectionNum].1.absoluteString
//                                        } else {
//                                            navigationState.urlString = suggestionList[selectionNum].1.absoluteString
//                                        }
//                                    } else {
//                                        if let v = unwrappedView() {
//                                            v.domain = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
//                                        } else {
//                                            navigationState.urlString = stripGoogleSearchSuffix(str: suggestionList[selectionNum].0)
//                                        }
//                                    }
//                                }
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
//                            }else if nsevent.keyCode == 51 {
//                                if nsevent.modifierFlags.contains(.control) && nsevent.modifierFlags.contains(.shift) {
//                                    if searchSuggestions && suggestionList.count > 0 {
//                                        if completionOn && completion.count > 0 {
//                                            if suggestionList[0].1.absoluteString != "about:blank" {
//                                                StoredData.removeObject(forKey: suggestionList[0].1.absoluteString)
//                                            } else if suggestionList[0].0.hasSuffix(" - Google Search") {
//                                                StoredData.removeObject(forKey: suggestionList[0].0)
//                                            }
//                                            completionOn = false
//                                            completion = ""
//                                        } else if selectionNum != -1 {
//                                            if suggestionList[selectionNum].1.absoluteString != "about:blank" {
//                                                StoredData.removeObject(forKey: suggestionList[selectionNum].1.absoluteString)
//                                            } else if suggestionList[selectionNum].0.hasSuffix(" - Google Search") {
//                                                StoredData.removeObject(forKey: suggestionList[selectionNum].0)
//                                            }
//                                        }
//                                    }
//                                } else {
//
//                                    if completionOn && searchSuggestions && completion.count > 0 {
//                                        returnNil = true
//                                    } else {
//                                        mutator.completionUpdates = false
//                                    }
//                                    completionOn = false
//
//                                }
//                            }
//                        }
//                    }
//                    return returnNil ? nil : nsevent
//                })
//                navigationState.eventMonitors.append(NSEvent.addLocalMonitorForEvents(matching: [.keyDown]) { nsevent in
//                    if nsevent.windowNumber == navigationState.window.windowNumber {
//                        if nsevent.modifierFlags.contains(.command) {
//                            if nsevent.keyCode == 18 { switchTab(index:0); return nil}
//                            if nsevent.keyCode == 19 { switchTab(index:1); return nil}
//                            if nsevent.keyCode == 20 { switchTab(index:2); return nil}
//                            if nsevent.keyCode == 21 { switchTab(index:3); return nil}
//                            if nsevent.keyCode == 23 { switchTab(index:4); return nil}
//                            if nsevent.keyCode == 22 { switchTab(index:5); return nil}
//                            if nsevent.keyCode == 26 { switchTab(index:6); return nil}
//                            if nsevent.keyCode == 28 { switchTab(index:7); return nil}
//                            if nsevent.keyCode == 25 { switchTab(index:navigationState.webViews.count-1); return nil}
//                        } else if nsevent.modifierFlags.contains(.control) {
//                            if nsevent.keyCode == 48 {
//                                if let index = navigationState.selectedWebIndex {
//                                    if nsevent.modifierFlags.contains(.shift) {
//                                        switchTab(index: index == 0 ? navigationState.webViews.count - 1 : index - 1)
//                                        return nil
//                                    } else {
//                                        switchTab(index: index == navigationState.webViews.count - 1 ? 0 : index + 1)
//                                        return nil
//                                    }
//                                }
//                            }
//                        }
//                    }
//                    return nsevent
//                })
//            }
//            .onChange(of: willClose) { new in
//                navigationState.webViews[0].removeFromSuperview()
//                navigationState.webViews[0].navigationDelegate = nil
//                navigationState.webViews[0].loadHTMLString("", baseURL: nil)
//                navigationState.selectedWebIndex = nil
//                navigationState.webViews.remove(at: 0)
//                navigationState.window.close()
//            }
//            .onChange(of: tabToClose) { tab in
//                let index = tab
//                if index != -1 {
//                    withAnimation(settings.animations ? .spring() : nil) {
//                        navigationState.selectedWebIndex = index == 0 ? 0 : index - 1
//                        if let url = navigationState.webViews[index].url {
//                            navigationState.lastClosed.append(url)
//                        }
//
//                        if navigationState.webViews[index].isTransferring {
//                            navigationState.webViews[index].isTransferring = false
//                        } else {
//                            navigationState.webViews[index].loadHTMLString("", baseURL: nil)
//                        }
//
//                        navigationState.webViews[index].removeFromSuperview()
//                        navigationState.webViews[index].navigationDelegate = nil
//                        navigationState.webViews.remove(at: index)
//                        navigationState.manualURLStringUpdate()
//
//                        tabToClose = -1
//                    }
//                }
//
//            }
//            .onChange(of: settings.transparent) { _ in
//                DispatchQueue.main.asyncAfter(deadline: .now()) {
//                    transparencyAnimationCount += 1
//                }
//                DispatchQueue.main.asyncAfter(deadline: .now() + 1.25) {
//                    transparencyAnimationCount -= 1
//                }
//            }
//            .onTapGesture {
//                focus = false
//            }
//
//
//    }
//    
//    func isLink(_ s : String) -> Bool {
//        return s == "about:blank" || (!s.contains(" ") && (hasTLD(s) || s.hasPrefix("http://") || s.hasPrefix("https://")))
//    }
//    
//    func unwrappedView() -> MyWebView? {
//        if let index = navigationState.selectedWebIndex {
//            if index < navigationState.webViews.count && index >= 0 {
//                return navigationState.webViews[index]
//            } else {
//                return nil
//            }
//        } else {
//            return nil
//        }
//    }
//    
//    func unwrappedBindingView() -> Binding<MyWebView>? {
//        if willClose {
//            return nil
//        }
//        if let index = navigationState.selectedWebIndex {
//            
//            if index == tabToClose {
//                return nil
//            }
//            
//            if index < navigationState.webViews.count && index >= 0 {
//                return $navigationState.webViews[index]
//            } else {
//                return nil
//            }
//        } else {
//            return nil
//        }
//    }
//    
//    func createNewWebView(withRequest request: URLRequest, noLoad: Bool = false) {
//        withAnimation(settings.animations ? .spring() : nil) {
//            let index = navigationState.selectedWebIndex ?? -1
//            let wv = MyWebView(frame: .zero, configuration: navigationState.config)
//            wv.navigationDelegate = navigationState
//            wv.allowsMagnification = true
//            wv.customUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15"
//
//            
//        
//            navigationState.webViews.insert(wv, at: index + 1)
//            
//            navigationState.selectedWebIndex = index + 1
//            if !noLoad {
//                wv.new = false
//                wv.load(request)
//            }
//            rerollCrystalSeed()
//            focus = true
//        }
//    }
//    
//    func deleteWebView(index:Int?) {
//        searchSuggestions = false
//        focus = false
//
//        if navigationState.webViews.count == 1 {
//            willClose = true
//        } else {
//            if let index = index {
//                tabToClose = index
//            }
//        }
//        rerollCrystalSeed()
//    }
//    
//    
//    func stripGoogleSearchSuffix(str: String) -> String {
//        if str.hasSuffix(" - Google Search") {
//            return String(str[str.startIndex..<str.index(str.endIndex, offsetBy: -16)])
//        } else {
//            return str
//        }
//    }
//    
//    @ViewBuilder
//    func highlightedCompletion() -> some View {
//        HStack(spacing: 1.5) {
//            Text(unwrappedView()?.domain ?? navigationState.urlString)
//                .font(.system(size: 13, weight: .light))
//                .foregroundColor((incognito ? whiteDark : whiteLight).opacity(0))
//
//            Text(completion)
//                .font(.system(size: 13, weight: .light))
//                .foregroundColor(incognito ? .white : .black)
//                .background(Color(red: 51/255.0, green: 153/255.0, blue: 255/255.0, opacity: incognito ? 0.6 : 0.3))
//            
//        }
//        .allowsHitTesting(false)
//    }
//    
//    @ViewBuilder
//    func SearchSuggestions() -> some View {
//        
//        VStack(alignment: .leading, spacing: 0) {
//            ForEach(Array(suggestionList.enumerated()), id: \.offset) { i, entry in
//                Button {
//                    focus = false
//                    if entry.1.absoluteString != "about:blank" {
//                        let request = URLRequest(url: entry.1)
//                        if let index = navigationState.selectedWebIndex {
//                            navigationState.webViews[index].load(request)
//                        }
//                    } else {
//                        let encodedTerm = entry.0.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
//                        if let encodedTerm = encodedTerm {
//                            let domain = "https://www.google.com/search?q=\(encodedTerm)"
//                            if let url = URL(string: domain) {
//                                let request = URLRequest(url: url)
//                                if let index = navigationState.selectedWebIndex {
//                                    navigationState.webViews[index].load(request)
//                                }
//                            }
//                        }
//                    }
//                    
//                } label: {
//                    HStack(spacing: 0) {
//                        GeometryReader() { geometry in
//                            let w = geometry.size.width
//                            let h = geometry.size.height
//                            Path { path in
//                                path.move(to: CGPoint(x: 0, y: 0))
//                                path.addLine(to: CGPoint(x: 0, y: (i == suggestionList.count - 1) ? h/2 : h))
//                                path.move(to: CGPoint(x: 0, y: h/2))
//                                path.addLine(to: CGPoint(x: w, y: h/2))
//                            }
//                            .stroke((incognito ? turquoiseDark : turquoise).opacity(1),
//                                    lineWidth: 0.5)
//                        }
//                        .frame(width: 13, height: 30)
//                        .padding(.leading, 15)
//                        
//                        
//                        HStack(spacing: 0) {
//                            
//                            entry.2
//                                .padding(.leading, 6)
//                                .padding(.trailing, 12)
//                                .fixedSize()
//                            
//                            getSuggestionText(entry: entry)
//                        }
//                        //                        .padding([.bottom, .top], 8)
//                        .padding(.trailing, 100)
//                        //                        .border(.blue)
//                    }
//                }
//                .buttonStyle(SuggestionStyle(selected: selectionNum == i, incognito: incognito, animations: $settings.animations))
//            }
//        }
//            .cornerRadius(10)
////            .overlay {
////                RoundedRectangle(cornerRadius: 10)
////                    .stroke(LinearGradient(stops: [Gradient.Stop(color: incognito ? greenDark : turquoise, location: 0), Gradient.Stop(color: .clear, location: 1)], startPoint: .bottomLeading, endPoint: UnitPoint(x: 0.1, y: 0.4)), lineWidth: 1)
////            }
//            .offset(y: 30)
//            .zIndex(5)
//        
//    }
//    
//    @ViewBuilder
//    func getSuggestionText(entry:(String, URL, AnyView)) -> some View {
//        Text((entry.0.hasSuffix(" - Google Search")) ? String(entry.0[entry.0.startIndex..<entry.0.index(entry.0.endIndex, offsetBy: -16)]) : entry.0)
//            .font(.system(size: 13, weight: .light))
//            .foregroundColor(incognito ? .white : .black)
//        + Text((entry.1.absoluteString != "about:blank") ? "     \(Image(systemName: "link"))  \(entry.1.absoluteString)" : "")
//            .font(.system(size: 13, weight: .light))
//            .foregroundColor(Color(red: 51/255.0, green: 153/255.0, blue: 255/255.0))
//
//    }
//    
//    func updateSuggestions(linkOnly: Bool = false) {
//        let prefix = unwrappedView()?.domain ?? navigationState.urlString
//
//        if prefix.count == 0 {
//            completionOn = false
//            suggestionList = []
//            return
//        }
//
//        if let dict = StoredData.dictionaryRepresentation() {
//            if dict.keys.count > 100 {
//                let sorted = dict.keys.sorted(by: {
//                    StoredData.array(forKey: $0)![1] as! Int > StoredData.array(forKey: $1)![1] as! Int
//                })
//                for i in 75..<sorted.count {
//                    StoredData.removeObject(forKey: sorted[i])
//                }
//            }
//        }
//
//        var domainMatches:[String] = []
//
//        if let dict = StoredData.dictionaryRepresentation() {
//            domainMatches = dict.keys.filter {
//                (stripHTTP(url: $0).hasPrefix(prefix) && $0 != "about:blank")
//            }
//        }
//
//        domainMatches = domainMatches.sorted(by: {
//            StoredData.array(forKey: $0)![1] as! Int > StoredData.array(forKey: $1)![1] as! Int
//        })
//        domainMatches = Array(domainMatches.prefix(5))
//        var list:[(String, URL, AnyView)] = []
//
//
//        for match in domainMatches {
//
//            if let arr = StoredData.array(forKey: match), arr.count == 2 {
//                let titleOrDomain = arr[0] as! String
//
//                if match.hasSuffix(" - Google Search") {
//                    
//                    if !linkOnly {
//                        let view = Image(systemName: "magnifyingglass.circle")
//                            .font(Font.system(size: 12))
//                            .foregroundColor((incognito ? turquoiseDark : turquoise))
//                        
//                        list.append((match, URL(string: "about:blank")!, AnyView(view)))
//                    }
//
//                } else {
//                    let s = "https://www.google.com/s2/favicons?sz=256&domain=\(match)"
//                    let view = WebImage(url: URL(string: s))
//                        .placeholder {
//                            Image(systemName: "globe.americas.fill")
//                                .font(.system(size: 12))
//                                .foregroundColor(incognito ? greenDark : green)
//                                .colorInvert()
//                        }
//                        .resizable()
//                        .frame(width: 14, height: 14)
//                        .clipped()
//
//                    list.append((titleOrDomain, URL(string: match)!, AnyView(view)))
//                }
//            }
//        }
//
//        if list.count > 0 {
//            if list[0].1.absoluteString != "about:blank" {
//                completion = list[0].1.absoluteString
//            } else {
//                if list[0].0.hasSuffix(" - Google Search") {
//                    completion = String(list[0].0[list[0].0.startIndex..<list[0].0.index(list[0].0.endIndex, offsetBy: -16)])
//                } else {
//                    completion = list[0].0
//                }
//            }
//        } else {
//            completion = ""
//        }
//
//        completion = stripHTTP(url: completion)
//        if completion.last == "/" {
//            completion.popLast()
//        }
//        if completion.count >= prefix.count {
//            completion = String(completion.suffix(completion.count - prefix.count))
//        }
//
//        if linkOnly {
//            suggestionList = list
//            return
//        }
//        
//        let search = (unwrappedView()?.domain ?? navigationState.urlString).replacingOccurrences(of: " ", with: "+")
//        let url = URL(string: "https://suggestqueries.google.com/complete/search?output=toolbar&hl=en&q=\(search)")
//
//        if let url = url {
//            let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
//                if let xml = data {
//
//                    let xmlParser = XMLParser(data: xml)
//                    let delegate = ParserDelegate(urls: $suggestionList, bufferedPrefix: list, completion: $completion)
//                    xmlParser.delegate = delegate
//                    xmlParser.parse()
//                    delegate.process()
//                } else {
//                    suggestionList = list
//                }
//            }
//
//            task.resume()
//        }
//
//        if mutator.completionUpdates {
//            completionOn = true
//        } else {
//            mutator.completionUpdates = true
//        }
//
//    }
//    
//    func stripHTTP(url: String) -> String {
//        var str = url
//        if str.hasPrefix("http://") {
//            str.removeFirst(7)
//        }
//        
//        if str.hasPrefix("https://") {
//            str.removeFirst(8)
//        }
//        
//        if str.hasPrefix("www.") {
//            str.removeFirst(4)
//        }
//        
//        return str
//    }
//    
//    
//    func completeTabBuilder(i:Int, currentIndex: Int) -> some View {
//        let width = min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//        return tabBuilderAuxiliary(i: i, currentIndex: currentIndex)
//            .offset(x: (targetLoc != -1) ? (i < currentIndex ? (targetLoc <= i ? width-1 : 0) : (i > currentIndex ? (targetLoc >= i ? -width+1 : 0) : 0) ) : 0)
//            .contextMenu {
//                Button("Move to New Window") {
//                
//                    parent.transferView(webView: navigationState.webViews[i], windowNumber: nil)
//                    
//                    navigationState.webViews[i].isTransferring = true
//                    deleteWebView(index: i)
//
//                }.disabled(navigationState.webViews.count <= 1 || incognito)
//                    .onAppear {
//                        transferList = getWindowNames()
//                    }
//                Menu("Move to Another Window") {
//                    ForEach(Array(transferList.enumerated()), id: \.offset) { index, tuple in
//                        Button(tuple.0) {
//                            parent.transferView(webView: navigationState.webViews[i], windowNumber: tuple.1)
//                            navigationState.webViews[i].isTransferring = true
//                            deleteWebView(index: i)
//                        }
//                    }
//                }
//                .isHidden(transferList.count < 1 || incognito, remove: true)
//            }
//    }
//    
//    func getWindowNames() -> [(String, Int)] {
//        var result:[(String, Int)] = []
//
//        for window in NSApplication.shared.windows {
//            if let delegate = window.delegate as? WindowDelegate {
//                if window.windowNumber == navigationState.window.windowNumber { continue }
//
//                var title = ""
//
//                if let s = delegate.getCurrTitle() {
//                    title = s.count > 0 ? s : "New Tab"
//                } else {
//                    title = "New Tab"
//                }
//
//
//                let count = delegate.navigationState.webViews.count
//                title += " - \(count) Tab\(count > 1 ? "s" : "")"
//
//                result.append((title, window.windowNumber))
//                
//            }
//        }
//        return result
//    }
//       
//    @ViewBuilder
//    func tabBuilderAuxiliary(i:Int, currentIndex:Int) -> some View {
//        if i == navigationState.selectedWebIndex {
//            if let s = navigationState.webViews[i].title {
//                currentTabBuilder(title: s.count > 0 ? s : "New Tab", url: s.count > 0 ? navigationState.webViews[i].url : nil)
//            } else {
//                currentTabBuilder(title: "New Tab", url: nil)
//            }
//        } else {
//            if let s = navigationState.webViews[i].title  {
//                otherTabBuilder(title: s.count > 0 ? s : "New Tab", url: s.count > 0 ? navigationState.webViews[i].url : nil, index: i)
//            } else {
//                otherTabBuilder(title: "New Tab", url: nil, index: i)
//            }
//        }
//    }
//            
//    func currentTabBuilder(title:String, url:URL?) -> some View {
//        let radius = 10.0
//        let width = min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//        let view = HStack(alignment: .bottom, spacing: 0) {
//            
//            Taper(left: true, incognito: incognito)
//                .frame(width: radius, height: radius)
//                
//
//            ZStack (alignment: .bottom) {
//                
//                Rectangle()
//                    .fill(.clear)
//                    .background(LinearGradient(colors: [incognito ? whiteDark : whiteLight, incognito ? bgDark : bg], startPoint: UnitPoint(x: 0.5, y: 0.5), endPoint: .top))
//                    .frame(maxWidth: width, maxHeight: 40)
//
//
//                crystalAnimation(width: width)
//                    .offset(CGSize(width: 0, height: -30))
//                    .isHidden(!(transparencyAnimationCount != 0  || settings.transparent), remove: true)
//                
//                HStack(spacing: 0) {
//                    
//                    Spacer(minLength: 0)
//                    
//                    faviconAsyncImage(url: url, index: navigationState.selectedWebIndex)
//                        .padding(.bottom, 4)
//     
// 
//                    Text(title)
//                        .font(.system(size: 11.5, weight: .light))
//                        .foregroundColor(incognito ? .white : .black)
//                        .lineLimit(1)
//                        .truncationMode(.tail)
//                        .layoutPriority(-10)
//                        .padding(.bottom, 4)
//                    
//                    Spacer(minLength: 0)
//
//                    Button {
//                        deleteWebView(index: navigationState.selectedWebIndex)
//                    } label: {
//                        Image(systemName: "xmark")
//                            .font(Font.system(size: 8))
//                            .foregroundColor((incognito ? greenDark : green))
//                    }.buttonStyle(XAnimatedStyle())
//                        .padding(.trailing, 4)
//                        .padding(.leading, 4)
//                        .padding(.bottom, 5)
//                        .layoutPriority(2)
//                        .keyboardShortcut("w", modifiers: [.command])
//                        
//                    
//                }.frame(maxWidth: width * 0.8, maxHeight: 20)
//
//            }
//
//
//            ZStack {
//
//                Taper(left: false, incognito: incognito)
//                    .frame(width: radius, height: radius)
//            }
//        }.padding([.leading, .trailing], -radius)
//            .offset(x: (draggingIndex == navigationState.selectedWebIndex) ? getDragX() : 0, y: (draggingIndex == navigationState.selectedWebIndex) ? (loc.y == 0 ? 0 : loc.y - 20) : 0)
//            .animation((draggingIndex == navigationState.selectedWebIndex && settings.animations) ? .easeInOut(duration: 0.25) : nil, value: dragEnd)
//        
//        return view.zIndex(1)
//            .gesture(
//                DragGesture()
//                    .updating($loc) { currentState, pastLocation, transaction in
//                        pastLocation.x = currentState.location.x
//                        if settings.animations {
//                            transaction.animation = .easeInOut(duration: 0.25)
//                        }
//                    }
//                    .onChanged { currentState in
//                        let change = (currentState.translation.width + ((currentState.translation.width > 0) ? 0.5 : -0.5) * min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)) / min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//                        if let index = navigationState.selectedWebIndex {
//                            draggingIndex = index
//                            var newIndex = index + Int(change)
//                            if newIndex < 0 {
//                                newIndex = 0
//                            } else if newIndex > navigationState.webViews.count - 1 {
//                                newIndex = navigationState.webViews.count - 1
//                            }
//                            withAnimation(settings.animations ? .spring() : nil) {
//                                targetLoc = newIndex
//                            }
//                            
//                        }
//                    }
//                    .onEnded { endState in
//                        searchSuggestions = false
//                        focus = false
//            
//                        
//                        let change = (endState.translation.width + ((endState.translation.width > 0) ? 0.5 : -0.5) * min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)) / min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//                        if let index = navigationState.selectedWebIndex {
//                            var newIndex = index + Int(change)
//                            if newIndex < 0 {
//                                newIndex = 0
//                            } else if newIndex > navigationState.webViews.count - 1 {
//                                newIndex = navigationState.webViews.count - 1
//                            }
//
//                            pos = newIndex - index
//                            dragEnd = true
//                            
//                            if newIndex - index != 0 {
//
//                                switchDragEnd = true
//                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
//                                    targetLoc = -1
//                                    draggingIndex = -1
//                                    
//                                    if newIndex < index {
//                                        for i in (newIndex..<index).reversed() {
//                                            navigationState.webViews.swapAt(i, i+1)
//                                        }
//                                    } else {
//                                        for i in (index..<newIndex) {
//                                            navigationState.webViews.swapAt(i, i+1)
//                                        }
//                                    }
//                                    
//                                    navigationState.selectedWebIndex = newIndex
//                                    
//                                    switchDragEnd = false
//                                    
//                                }
//                            }
//                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
//                                dragEnd = false
//                                targetLoc = -1
//                                draggingIndex = -1
//                            }
//                        }
//                    }
//            )
//    }
//    
//    func getDragX(unselected: Bool = false) -> CGFloat {
//        if dragEnd {
//            return CGFloat(pos) * (min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)-1)
//        } else if !unselected {
//            if loc.x == 0  {
//                return 0
//            } else {
//                return loc.x - min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0) / 2
//            }
//        } else {
//            if loc2.x == 0  {
//                return 0
//            } else {
//                return loc2.x - min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0) / 2
//            }
//        }
//    }
//    
//    func otherTabBuilder(title: String, url:URL?, index:Int) -> some View {
//        
//        let width = min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//        
//        let view = ZStack(alignment: .bottom) {
//            Rectangle()
//                .fill(.clear)
//                .frame(maxWidth: width, maxHeight: 40)
//                .contentShape(Rectangle())
//            
//            Rectangle()
//                .fill(.clear)
//                .frame(maxWidth: width, maxHeight: 23)
//                .overlay(
//                    index != 0 ? Rectangle().frame(width: 1, height: 15, alignment: .leading).foregroundColor(Color.gray) : Rectangle().frame(width: 0, height: 0).foregroundColor(incognito ? .white : .black), alignment: .leading)
//                .overlay(Rectangle().frame(width: 1, height: 15, alignment: .trailing).foregroundColor(Color.gray), alignment: .trailing)
//            HStack(spacing: 0) {
//                
//                Spacer(minLength: 0)
//                
//                faviconAsyncImage(url: url, index: index)
//                    .padding(.bottom, 4)
//
//                
//                Text(title)
//                    .font(.system(size: 11.5, weight: .light))
//                    .foregroundColor(incognito ? .white : .black)
//                    .lineLimit(1)
//                    .truncationMode(.tail)
//                    .layoutPriority(-10)
//                    .padding(.bottom, 4)
//                
//                Spacer(minLength: 0)
//                
//
//                Button {
//                    deleteWebView(index: index)
//                } label: {
//                    Image(systemName: "xmark")
//                        .font(Font.system(size: 8))
//                        .foregroundColor((incognito ? greenDark : green))
//                }.buttonStyle(XAnimatedStyle())
//                    .highPriorityGesture(TapGesture()
//                        .onEnded { _ in
//                            deleteWebView(index: index)
//                        })
//                    .padding(.trailing, 4)
//                    .padding(.leading, 4)
//                    .padding(.bottom, 5)
//                    .layoutPriority(2)
//                    .zIndex(5)
//                    .isHidden(!(width > 65), remove: true)
//                        
//            }.frame(maxWidth: width * 0.8, maxHeight: 20)
//            .zIndex(2)
//        }
//    
//        .modifier(Tab(incognito: incognito, animations: $settings.animations))
//        .offset(x: (draggingIndex == index) ? getDragX(unselected: true) : 0, y: (draggingIndex == index) ? (loc2.y == 0 ? 0 : loc2.y - 20) : 0)
//        .animation((draggingIndex == index && settings.animations) ? .easeInOut(duration: 0.25) : nil, value: dragEnd)
//    
//        return view
//            .simultaneousGesture(
//                DragGesture()
//                    .updating($loc2) { currentState, pastLocation, transaction in
//                        pastLocation.x = currentState.location.x
//                        if settings.animations {
//                            transaction.animation = .easeInOut(duration: 0.25)
//                        }
//                    }
//                    .onChanged { currentState in
//
//                        let change = (currentState.translation.width + ((currentState.translation.width > 0) ? 0.5 : -0.5) * min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)) / min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//
//                        draggingIndex = index
//                        var newIndex = index + Int(change)
//                        if newIndex < 0 {
//                            newIndex = 0
//                        } else if newIndex > navigationState.webViews.count - 1 {
//                            newIndex = navigationState.webViews.count - 1
//                        }
//                        withAnimation(settings.animations ? .spring() : nil) {
//                            targetLoc = newIndex
//                        }
//
//                    }
//                    .onEnded { endState in
//                        searchSuggestions = false
//                        focus = false
//                        
//                        
//                        let change = (endState.translation.width + ((endState.translation.width > 0) ? 0.5 : -0.5) * min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)) / min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//                    
//                        var newIndex = index + Int(change)
//                        if newIndex < 0 {
//                            newIndex = 0
//                        } else if newIndex > navigationState.webViews.count - 1 {
//                            newIndex = navigationState.webViews.count - 1
//                        }
//
//                        pos = newIndex - index
//                        
//                        dragEnd = true
//                        
//                        if newIndex - index != 0 {
//
//                            switchDragEnd = true
//                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
//                                targetLoc = -1
//                                draggingIndex = -1
//                                
//                                if newIndex < index {
//                                    for i in (newIndex..<index).reversed() {
//                                        navigationState.webViews.swapAt(i, i+1)
//                                    }
//                                } else {
//                                    for i in (index..<newIndex) {
//                                        navigationState.webViews.swapAt(i, i+1)
//                                    }
//                                }
//                                
//                                if let curr = navigationState.selectedWebIndex {
//                                    if newIndex > index && curr <= newIndex && curr > index {
//                                        navigationState.selectedWebIndex = curr - 1
//                                    } else if newIndex < index && curr >= newIndex && curr < index {
//                                        navigationState.selectedWebIndex = curr + 1
//                                    }
//                                }
//                                
//                                switchDragEnd = false
//                                
//                            }
//                        }
//                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
//                            dragEnd = false
//                            targetLoc = -1
//                            draggingIndex = -1
//                        }
//                    
//                    }
//        )
//            .simultaneousGesture(TapGesture()
//                .onEnded { _ in
//                    switchTab(index: index)
//                })
//    }
//    
//    func switchTab(index:Int) {
//        
//        if index < 0 || index >= navigationState.webViews.count {return}
////        withAnimation(settings.animations ? .easeInOut(duration: 0.1) : nil) {
//        navigationState.selectedWebIndex = index
//        navigationState.webViews[index] = navigationState.webViews[index]
//        navigationState.manualURLStringUpdate()
//        //        rerollCrystalSeed()
//        searchSuggestions = false
//        focus = false
////        }
//    }
//    
//    
//    @ViewBuilder
//    func faviconAsyncImage(url:URL?, index:Int?) -> some View {
//        
//        if let index = index {
//            if index < navigationState.webViews.count && index >= 0 {
//                if (navigationState.webViews[index].load) {
//                    Group {
//                        LoadingAnimation(width: 7, height: 7, maxRadius: 6, count: 3, time: 1.35, incognito: incognito, iterations: 21, animations: true)
//                            .padding(.trailing, 8)
//                    }.frame(minWidth: 0, maxWidth: 27, minHeight: 17, maxHeight: 17)
//                        .layoutPriority(0)
//                } else if (!navigationState.webViews[index].new) {
//                    let size = "256"
//                    if let u = url {
//                        let s = "https://www.google.com/s2/favicons?sz=\(size)&domain=\(u.absoluteString)"
//                        Group {
//                            WebImage(url: URL(string: s))
//                                .resizable()
//                                .placeholder {
//                                    Image(systemName: "globe.americas")
//                                        .font(.system(size: 12))
//                                        .foregroundColor(incognito ? greenDark : green)
//                                        .colorInvert()
//                                }
//                                .frame(width: 17, height: 17)
//                                .layoutPriority(-1)
//                                .scaledToFill()
//                                .frame(minWidth: 0, maxWidth: 17, minHeight: 17, maxHeight: 17)
//                                .clipped()
//                                .padding(.bottom, 0)
//                                .padding(.leading, 4)
//                                .padding(.trailing, 6)
//                        }.frame(minWidth: 0, maxWidth: 27, minHeight: 17, maxHeight: 17)
//                            .layoutPriority(0)
//                    }
//                }
//            }
//        }
//    }
//    
//
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
//                    .font(.system(size: 13, weight: .light))
//                    .foregroundColor(incognito ? Color(white: 0.5) : Color(white: 0.7))
//                let t2:Text = Text(String(str[str.index(second, offsetBy: 1)..<third]))
//                    .font(.system(size: 13, weight: .light))
//                    .foregroundColor(incognito ? .white : .black)
//                let t3:Text = Text(String(str[third..<str.endIndex]))
//                    .font(.system(size: 13, weight: .light))
//                    .foregroundColor(incognito ? Color(white: 0.5) : Color(white: 0.7))
//                return (t1 + t2 + t3).isHidden(false)
//            }
//        }
//        return Text("").isHidden(true, remove: true)
//    }
//    
//    
//    func rerollCrystalSeed() {
//        let width = min((navigationState.window.frame.width * 0.9 / CGFloat(navigationState.webViews.count) + 1), 150.0)
//        let height = 40.0
//
//        let maxRadius = 50.0
//        
//        seed = []
//        
//        for _ in 0...15 {
//            let center = CGPoint(x: Double.random(in: 0...width), y: Double.random(in: 0...height))
//            let a1:Double = Double.random(in: 0..<2 * Double.pi)
//            let a3:Double = Double.random(in: 0..<2 * Double.pi)
//            let a2:Double = Double.random(in: 0..<2 * Double.pi)
//            let r1 = Double.random(in: 0..<maxRadius)
//            let r2 = Double.random(in: 0..<maxRadius)
//            let r3 = Double.random(in: 0..<maxRadius)
//            let triangle = [CGPoint(x: center.x + r1 * sin(Double(a1)), y: center.y + r1 * cos(Double(a1))), CGPoint(x: center.x + r2 * sin(Double(a2)), y: center.y + r2 * cos(Double(a2))), CGPoint(x: center.x + r3 * sin(Double(a3)), y: center.y + r3 * cos(Double(a3)))]
//            seed.append(triangle)
//        }
//    }
//    
//    
//    func crystalAnimation(width:CGFloat) -> some View {
//        
//        let height = 40.0
//        
//        return ZStack {
//            ForEach(Array(seed.enumerated()), id: \.offset) { index, triangle in
//                ZStack {
//                    GeometryReader { geometry in
//                        Path { path in
//
//                            path.move(to: triangle[0])
//                            path.addLine(to: triangle[1])
//                            path.addLine(to: triangle[2])
//
//                            path.closeSubpath()
//                        }
//                        .fill(settings.transparent ? (incognito ? greenDark : green).opacity((40 - triangle[0].y)  / 40.0) : .clear)
//                        .brightness(-((40 - triangle[1].y)  / 40.0))
//
//                    }.frame(maxWidth: width, maxHeight: height)
//                        .animation((settings.animations) ? .easeInOut(duration: 0.4).delay((settings.transparent ? 0.3 : 0) + (settings.transparent ? triangle[2].y : 40 - triangle[2].y)/80.0) : nil, value: settings.transparent)
//                    
//                    GeometryReader { geometry in
//                        Path { path in
//                            
//                            path.move(to: triangle[0])
//                            path.addLine(to: triangle[1])
//                            path.addLine(to: triangle[2])
//                            
//                            path.closeSubpath()
//                        }
//                        .trim(from: 0, to: settings.transparent ? 1 : 0)
//                        .stroke(settings.transparent ? (incognito ? greenDark : green).opacity((40 - triangle[0].y)  / 40.0) : .clear)
//                        .brightness(-((40 - triangle[1].y)  / 40.0))
//                        
//                    }.frame(maxWidth: width, maxHeight: height)
//                        .animation((settings.animations) ? .easeInOut(duration: 0.5).delay((settings.transparent ? 0 : 0.3) + (settings.transparent ? triangle[2].y : 40 - triangle[2].y)/160.0) : nil, value: settings.transparent)
//                    
//                }
//                
//                
//            }
//        }.frame(maxWidth: width, maxHeight: height)
//        
//    }
//}
//
//
//
//struct VisualEffectBackground: NSViewRepresentable {
//    private let material: NSVisualEffectView.Material
//    private let blendingMode: NSVisualEffectView.BlendingMode
//    private let isEmphasized: Bool
//    private let dark: Bool
//    
//    fileprivate init(
//        material: NSVisualEffectView.Material, blendingMode: NSVisualEffectView.BlendingMode, emphasized: Bool, dark:Bool) {
//        self.material = material
//        self.blendingMode = blendingMode
//        self.isEmphasized = emphasized
//        self.dark = dark
//    }
//    
//    func makeNSView(context: Context) -> NSVisualEffectView {
//        let view = NSVisualEffectView()
//        
//        // Not certain how necessary this is
//        view.autoresizingMask = [.width, .height]
//        
//        return view
//    }
//    
//    func updateNSView(_ nsView: NSVisualEffectView, context: Context) {
//        nsView.material = material
//        nsView.blendingMode = blendingMode
//        nsView.isEmphasized = isEmphasized
//        nsView.appearance = NSAppearance(named: dark ? .vibrantDark : .vibrantLight)
//    }
//}
//
//
//
//
//
//struct Taper: View {
//    
//    var left:Bool
//    var incognito:Bool
//    
//    var body: some View {
//        GeometryReader { geometry in
//            Path { path in
//                
//                let w = geometry.size.width
//                let h = geometry.size.height
//
//                path.move(to: CGPoint(x: left ? w : 0, y: 0))
//                path.addLine(to: CGPoint(x: left ? w : 0, y: h))
//                path.addLine(to: CGPoint(x: left ? 0 : w, y: h))
//
//                if left {
//                    path.addArc(center: CGPoint(x: 0, y: 0), radius: h, startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 0), clockwise: true)
//                } else {
//                    path.addArc(center: CGPoint(x: w, y: 0), radius: h, startAngle: Angle(degrees: 90), endAngle: Angle(degrees: 180), clockwise: false)
//                }
//
//            }
//            .fill((incognito ? whiteDark : whiteLight))
//        }
//    }
//}
//
//
//struct Tab: ViewModifier {
//        
//    @State var hover = false
//    var incognito:Bool
//    @Binding var animations:Bool
//    
//    func body(content: Content) -> some View {
//        content
//            .background(Color(white: incognito ? 0.3 : 1, opacity: hover ? 0.5 : 0))
//            .animation(
//                (animations) ? .easeInOut(duration: 0.1) : nil,
//                value: hover
//            )
//            .mask(LinearGradient(gradient: Gradient(stops: [Gradient.Stop(color: (incognito ? whiteDark : whiteLight), location: 0.3), Gradient.Stop(color: .clear, location: 1),]), startPoint: .bottom, endPoint: UnitPoint(x: 0.5, y: 0)))
//            .onHover { over in
//                self.hover = over
//            }
//    }
//}
//
//
//class ParserDelegate : NSObject, XMLParserDelegate {
//
//    @Binding var urls:[(String, URL, AnyView)]
//    @Binding var completion:String
//    
//    var temp: [(String, URL, AnyView)] = []
//    var prefix: [(String, URL, AnyView)]
//    
//    
//    init(urls: Binding<[(String, URL, AnyView)]>, bufferedPrefix:[(String, URL, AnyView)], completion: Binding<String>) {
//        self._urls = urls
//        self.prefix = bufferedPrefix
//        self._completion = completion
//    }
//    
//    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
//        for (_, attr_val) in attributeDict {
//                 
//            let view = Image(systemName: "magnifyingglass")
//                .font(Font.system(size: 12))
//                .foregroundColor(.gray)
//            
//            if !prefix.contains(where: { $0.0 == attr_val + " - Google Search" }) {
//                if attr_val != "content-type" && attr_val != "text/html; charset=utf-8" {
//                    temp.append((attr_val, URL(string: "about:blank")!, AnyView(view)))
//                }
//            }
//                
//        }
//        
//    }
//    
//    func process() {
//        let cap = (temp.count < 7 - prefix.count) ? temp.count : 7 - prefix.count
//        urls = prefix + Array(temp.prefix(upTo: cap))
//        
//    }
//    
//}
//
//
//
//
//struct SuggestionStyle: ButtonStyle {
//    
//    @State var hover = false
//    var selected:Bool
//    var incognito:Bool
//    @Binding var animations:Bool
//    
//    func makeBody(configuration: Self.Configuration) -> some View {
//        configuration.label
//            .background(configuration.isPressed ? Color(white: 0.92) : (hover || selected ? (incognito ? Color(white: 0.25) : Color(white: 0.96)) : (incognito ? Color(white: 0.2) : whiteLight)))
//            .animation(
//                animations ? .easeInOut(duration: 0.05) : nil,
//                value: hover
//            )
//            .onHover { over in
//                self.hover = over
//            }
//            .mask(
//                HStack(spacing: 0) {
//                    Rectangle()
//                        .fill((incognito ? whiteDark : whiteLight))
//                        .frame(maxWidth: .infinity, maxHeight: .infinity)
//                    
//                    Rectangle()
//                        .fill(
//                            LinearGradient(gradient: Gradient(stops: [Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight), location: 0), Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight).opacity(0.95), location: 0.3), Gradient.Stop(color: (incognito ? Color(white: 0.2) : whiteLight).opacity(0.8), location: 0.5), Gradient.Stop(color: .clear, location: 1),]), startPoint: .leading, endPoint: .trailing)
//                        )
//                        .frame(maxWidth: 80)
//                }
//            )
//
//    }
//}
//
//
//class StoredData {
//    
//    static let filePath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!.appendingPathComponent("search_data.bin")
//    
//    static func saveDictionaryToFile(dictionary: [String: Any]) throws {
//        let data = try JSONSerialization.data(withJSONObject: dictionary, options: [])
//        try data.write(to: filePath)
//    }
// 
//    static func readDictionaryFromFile() throws -> [String: Any]? {
//        do {
//            let data = try Data(contentsOf: filePath)
//            let json = try JSONSerialization.jsonObject(with: data, options: [])
//            return json as? [String: Any]
//        } catch {
//            return [:]
//        }
//    }
//    
//    static func set(_ value: Any, forKey: String) {
//        do {
//            if var dict = try readDictionaryFromFile() {
//                dict[forKey] = value
//                try saveDictionaryToFile(dictionary: dict)
//            }
//        } catch {
//            print("Error setting dictionary value: \(error)")
//        }
//    }
//    
//    static func array(forKey:String) -> [Any]? {
//        do {
//            if var dict = try readDictionaryFromFile() {
//                let value = dict[forKey]
//                if let unwrapped = value as? [Any]? {
//                    return unwrapped
//                } else {
//                    dict.removeValue(forKey: forKey)
//                    try saveDictionaryToFile(dictionary: dict)
//                }
//            }
//        } catch {
//            print("Error getting dictionary value: \(error)")
//        }
//        return nil
//    }
//    
//    static func dictionaryRepresentation() -> [String: Any]? {
//        do {
//            if let dict = try readDictionaryFromFile() {
//                return dict
//            }
//        } catch {
//            print("Error getting dictionary representation: \(error)")
//        }
//        return nil
//    }
//    
//    static func removeObject(forKey:String) {
//        do {
//            if var dict = try readDictionaryFromFile() {
//                dict.removeValue(forKey: forKey)
//                try saveDictionaryToFile(dictionary: dict)
//            }
//        } catch {
//            print("Error removing dictionary value: \(error)")
//        }
//    }
//    
//    static func clearData() {
//        do {
//            try saveDictionaryToFile(dictionary: [:])
//        } catch {
//            print("Error clearing dictionary: \(error)")
//        }
//    }
//}
//
//
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
//struct LoadingAnimation: View {
//    @State var lseed:[([CGPoint], [Double])] = []
//    @State var loadingAnimation:Bool = false
//    
//    var width:CGFloat
//    var height:CGFloat
//    var maxRadius:CGFloat
//    var count:Int
//    var time:CGFloat
//    var incognito:Bool
//    var iterations:Int = -1
//    var outline:Bool = true
//    
//    @State var animations:Bool
//        
//    func rerollLoadingSeed(width: CGFloat, height: CGFloat, maxRadius: CGFloat, count:Int) {
//        lseed = []
//        for _ in 0..<count {
//            let center = CGPoint(x: Double.random(in: 0...width), y: Double.random(in: 0...height))
//            let a1:Double = Double.random(in: 0..<2 * Double.pi)
//            let a3:Double = Double.random(in: 0..<2 * Double.pi)
//            let a2:Double = Double.random(in: 0..<2 * Double.pi)
//            let r1 = Double.random(in: 0..<maxRadius)
//            let r2 = Double.random(in: 0..<maxRadius)
//            let r3 = Double.random(in: 0..<maxRadius)
//            let triangle = [CGPoint(x: center.x + r1 * sin(Double(a1)), y: center.y + r1 * cos(Double(a1))), CGPoint(x: center.x + r2 * sin(Double(a2)), y: center.y + r2 * cos(Double(a2))), CGPoint(x: center.x + r3 * sin(Double(a3)), y: center.y + r3 * cos(Double(a3)))]
//            
//            lseed.append((triangle, [Double.random(in: 0...1), -Double.random(in: 0...((incognito) ? 0.6 : 1))]))
//        }
//        
//    }
//    
//  
//    
//    var body: some View {
//
//        return ZStack {
//            ForEach(Array(lseed.enumerated()), id: \.offset) { index, triangle in
//                ZStack {
//                    GeometryReader { geometry in
//                        Path { path in
//
//                            path.move(to: triangle.0[0])
//                            path.addLine(to: triangle.0[1])
//                            path.addLine(to: triangle.0[2])
//
//                            path.closeSubpath()
//                        }
//                        .fill(loadingAnimation ? (incognito ? greenDark : green).opacity(triangle.1[0]) : .clear)
//                        .brightness(triangle.1[1])
//
//                    }.frame(maxWidth: width, maxHeight: height)
//                        .animation((animations) ? getAnimation(index: index) : nil, value: loadingAnimation)
//                        .onAppear {
//                            loadingAnimation = true
//                        }
//
//                    GeometryReader { geometry in
//                        Path { path in
//
//                            path.move(to: triangle.0[0])
//                            path.addLine(to: triangle.0[1])
//                            path.addLine(to: triangle.0[2])
//
//                            path.closeSubpath()
//                        }
//                        .trim(from: 0, to: loadingAnimation ? 1 : 0)
//                        .stroke(loadingAnimation ? (incognito ? greenDark : green).opacity(triangle.1[0]) : .clear)
//                        .brightness(triangle.1[1])
//                        .isHidden(!outline, remove: true)
//
//                    }.frame(maxWidth: width, maxHeight: height)
//                        .animation((animations) ? getAnimation(index: index, forPath: true) : nil, value: loadingAnimation)
//                }
//            }
//            .padding([.leading], width/4)
//            .padding([.top], height/4)
//
//        }.frame(maxWidth: width, maxHeight: height)
//            .onAppear {
//                rerollLoadingSeed(width: width/2, height: height/2, maxRadius: maxRadius, count: count)
//            }
//    }
//    
//    func getAnimation(index:Int, forPath:Bool = false) -> Animation? {
//        let dur:Double = time + Double(index) / Double(count)
//        
//        if (iterations < 0) {
//            if !forPath {
//                return .easeInOut(duration: (dur*0.3)).repeatForever().delay(dur*0.7)
//            }
//            return .easeInOut(duration: dur).repeatForever()
//        } else if (iterations == 0) {
//            return nil
//        } else {
//            if !forPath {
//                return .easeInOut(duration: dur*0.3).repeatCount(iterations).delay(dur*0.7)
//            }
//            return .easeInOut(duration: dur).repeatCount(iterations)
//        }
//    }
//}
//
//
//struct NewPage : View {
//    
//    var incognito:Bool
//    var navigationState:NavigationState
//    
//    @State var intro = false
//
//    let animTime:CGFloat = 2
//    
//    @Binding var animations:Bool
//    
//    var body: some View {
//        let mainAnimation = LoadingAnimation(width: 400, height: 400, maxRadius: 250, count: 7, time: animTime/2, incognito: incognito, iterations: 1, animations: animations)
//        
//        let auxiliaryAnimation = LoadingAnimation(width: navigationState.window.frame.width, height: navigationState.window.frame.height - 200, maxRadius: navigationState.window.frame.width / 2, count: 5, time: animTime, incognito: incognito, iterations: 1, outline: false, animations: animations)
//        
//        ZStack {
//            
//            mainAnimation
//            
//            Text("Project\nCrystal")
//                .font(.system(size: 45, weight: .light))
//                .multilineTextAlignment(.center)
//                .foregroundColor(incognito ? .white : .black)
//                .shadow(color: incognito ? .black : .white, radius: 8)
//                .opacity(intro ? 1 : 0)
//                .animation((animations) ? .easeInOut(duration: animTime/2).delay(animTime/2) : nil, value: intro)
//
//            mainAnimation
//                .mask(
//                    Text("Project\nCrystal")
//                        .font(.system(size: 45, weight: .light))
//                        .multilineTextAlignment(.center)
//                        .foregroundColor(.black)
//                        .opacity(intro ? 1 : 0)
//                        .animation((animations) ? .easeInOut(duration: animTime) : nil, value: intro)
//                )
//                .colorInvert()
//            
//        }.frame(maxWidth: .infinity, maxHeight: .infinity)
//        .onAppear {
//            intro = true
//        }
//        .background {
//            auxiliaryAnimation
//            .colorInvert()
//            .blur(radius: 20)
//            .frame(maxWidth: .infinity, maxHeight: .infinity)
//            .background(incognito ? whiteDark : whiteLight)
//        }
//        .clipped()
//    }
//}
//
//
//
//
//extension View {
//    @ViewBuilder func isHidden(_ hidden: Bool, remove: Bool = false) -> some View {
//        if hidden {
//            if !remove {
//                self.hidden()
//            }
//        } else {
//            self
//        }
//    }
//}
//
//
//
//class Mutator {
//    var completionUpdates = true
//    var suggestUpdates = true
//}
