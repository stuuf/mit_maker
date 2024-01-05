import SwiftUI
import KeyboardShortcuts
import WebKit

let w = 150.0
let h = (NSScreen.main!.frame.height / NSScreen.main!.frame.width) * w

let b = 10.0


let color1 = Color(red: 30.0/255, green: 255.0/255, blue: 0.0/255)
let color2 = Color(red: 0.0, green: 56.0/255, blue: 22.0/255)


struct SettingsPopup: View {
    
    @ObservedObject var settings:Settings
    let parent:AppDelegate
    
    @State var shortcutModal = false
    @State var cookieClearConfirmation = false
    @State var searchClearConfirmation = false
    
    @Environment(\.colorScheme) var colorScheme: ColorScheme
    
    var body: some View {
        return VStack {
            
            Text("Settings").font(.title2).padding(.bottom, 20).padding(.top, 30)
            Divider()
            
            HStack(spacing: 30) {
                VStack {
                    HStack {
                        Text("Opacity").offset(y:10)
                        ZStack {
                            Slider(
                                value: $settings.opacity,
                                in: 0.01...1
                            )
                            .onChange(of: settings.opacity) { newValue in
                                parent.update()
                            }
                            .frame(width: 150)
//                            .tint(turquoise)
                            
                            
                            ZStack {
                                Path(roundedRect: CGRect(origin: CGPoint(x: 0, y: 0), size: CGSize(width: 1.00*30, height: 1.00*18)), cornerRadius: 0.30*18)
                                    .fill(Color(white: 1, opacity: 0.5))
                                    .frame(width: 30, height: 18)
                                Text(String(format: "%.2f", settings.opacity))
                                    .foregroundColor(.black)
                            }.offset(x:-66 + settings.opacity*130, y:-23)
                        }.padding(.top, 20)
                    }.padding(10)
                    
                    
                    VStack(alignment: .center) {
                        
                        Toggle("Hidden", isOn: $settings.hidden)
                            .onChange(of: settings.hidden) { newValue in
                                parent.update()
                            }
                            .toggleStyle(SwitchToggleStyle(tint: turquoise))
//                            .tint(turquoise)
                        
                        Toggle("Click Transparency", isOn: $settings.transparent)
                            .onChange(of: settings.transparent) { newValue in
                                parent.update()
                            }
                            .toggleStyle(SwitchToggleStyle(tint: turquoise))
//                            .tint(turquoise)
                        
                        Text("When on, clicks will pass through Crystallization windows\nToggles on quadruple click").font(.footnote).multilineTextAlignment(.center)
                        
                        Toggle("Sticky Windows", isOn: $settings.sticky)
                            .onChange(of: settings.sticky) { newValue in
                                UserDefaults.standard.set(settings.sticky, forKey: "sticky")
                                parent.update()
                            }
                            .toggleStyle(SwitchToggleStyle(tint: turquoise))
//                            .tint(turquoise)
                            .padding(.top, 3)
                        
                        Text("When on, Crystallization windows will not\nmove across full screen windows").font(.footnote).multilineTextAlignment(.center)
                        
                        
                        Toggle("Animations", isOn: $settings.animations)
                            .onChange(of: settings.animations) { newValue in
                                UserDefaults.standard.set(settings.animations, forKey: "animations")
                                parent.update()
                            }
                            .toggleStyle(SwitchToggleStyle(tint: turquoise))
//                            .tint(turquoise)
                            .padding(.top, 3)
                        
                        Text("Turning off animations can significantly\ndecrease energy consumption").font(.footnote).multilineTextAlignment(.center)
                        
                        Toggle("Window Shadows", isOn: $settings.shadow)
                            .onChange(of: settings.shadow) { newValue in
                                UserDefaults.standard.set(settings.shadow, forKey: "shadow")
                                parent.update()
                            }
                            .toggleStyle(SwitchToggleStyle(tint: turquoise))
//                            .tint(turquoise)
                            .padding(.top, 3)
                    }.padding(.bottom, 10)
                }
                

                
                VStack {
                    Text("Keyboard Shortcuts").font(.title3)
                    
                    Form {
                        KeyboardShortcuts.Recorder("Hide/Unhide", name: .hidden)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Toggle Transparency", name: .transparent)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Toggle Sticky Windows", name: .sticky)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Increase Opacity", name: .upOpacity)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Decrease Opacity", name: .downOpacity)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Open New Window", name: .createNewWindow)
                    }
                    Form {
                        KeyboardShortcuts.Recorder("Open New Incognito Window", name: .createNewIncognitoWindow)
                    }
                    
                    HStack {
                        Text("In-Browser Shortcuts")
                        Button {
                            shortcutModal.toggle()
                        } label: {
                            Image(systemName: "info.circle")
                                .foregroundColor(shortcutModal ? turquoise: nil)
                        }.sheet(isPresented: $shortcutModal) {
                            VStack {
                                HStack {
                                    VStack(alignment: .leading) {
                                        Text("Open new tab")
                                        Text("Open last closed tab")
                                        Text("Delete tab")
                                        Text("Switch tab")
                                        Text("Select search bar")
                                        Text("Delete selected search suggestion")
                                        Text("Enter full screen mode")
                                        Text("Open new window")
                                        Text("Open new incognito window")
                                    }
                                    VStack(alignment: .trailing) {
                                        Text("⌘ T")
                                        Text("⇧ ⌘ T")
                                        Text("⌘ W")
                                        Text("⌘ (any #)")
                                        Text("⌘ L")
                                        Text("⇧ ⌃ ⌫")
                                        Text("⇧ ⌘ F")
                                        Text("⌘ N")
                                        Text("⇧ ⌘ N")
                                    }
                                }
                                Text("Click to dismiss").font(.subheadline).padding(10)
                            }.padding(50)
                                .cornerRadius(10)
                                .background(VisualEffectBackground(material: .titlebar, blendingMode: .behindWindow, emphasized: false, dark: colorScheme == .dark))
                                .onTapGesture {
                                    shortcutModal = false
                                }
                        }
                        .buttonStyle(AnimatedStyle(animations: settings.animations))
                    }.padding(.top, 5)
                    
                }.padding(10)
            }
            
            Divider()
            
            //            Button("New Window") {
            //                parent.createWindow()
            //            }.padding(.top, 10).buttonStyle(TurquoiseRoundedRectangleButtonStyle())
            //
            //            Button("New Incognito Window") {
            //                parent.createWindow(incognito: true)
            //            }.buttonStyle(DarkGreenRoundedRectangleButtonStyle())
            HStack(spacing: 40) {
                Button {
                    cookieClearConfirmation = true
                } label: {
                    Image(systemName: "circle.hexagongrid.circle.fill")
                        .font(.title)
                        .foregroundColor(.orange)
                }.buttonStyle(GrowStyle(animations: settings.animations))
                    .confirmationDialog(
                        "Do you want to clear all cookies for this browser?",
                        isPresented: $cookieClearConfirmation
                    ) {
                        Button("Yes") {
                            HTTPCookieStorage.shared.removeCookies(since: Date.distantPast)
                            
                            WKWebsiteDataStore.default().fetchDataRecords(ofTypes: WKWebsiteDataStore.allWebsiteDataTypes()) { records in
                                records.forEach { record in
                                    WKWebsiteDataStore.default().removeData(ofTypes: record.dataTypes, for: [record], completionHandler: {})
                                }
                            }
                        }
                    }.help("Clear cookies")
                
                Button {
                    searchClearConfirmation = true
                } label: {
                    Image(systemName: "trash")
                        .font(.title)
                        .foregroundColor(.red)
                }.buttonStyle(GrowStyle(animations: settings.animations))
                    .confirmationDialog(
                        "Do you want to clear all search history for this browser?",
                        isPresented: $searchClearConfirmation
                    ) {
                        Button("Yes") {
                            StoredData.clearData()
                        }
                    }.help("Clear search history")
                
                Button {
                    parent.createWindow(offset: 20)
                } label: {
                    Image(systemName: "plus.rectangle.on.rectangle")
                        .font(.title)
                        .foregroundColor(green)
                }.buttonStyle(GrowStyle(animations: settings.animations))
                    .keyboardShortcut("n", modifiers: [.command])
                    .help("New window")
                
                Button {
                    parent.createWindow(incognito: true, offset: 20)
                } label: {
                    Image(systemName: "eyeglasses")
                        .font(.title)
                        .foregroundColor(greenDark)
                }.buttonStyle(GrowStyle(animations: settings.animations))
                    .keyboardShortcut("n", modifiers: [.command, .shift])
                    .help("New incognito window")

                Button("Quit") {
                    NSApp.terminate(self)
                }.buttonStyle(RoundedRectangleButtonStyle())
            }.padding([.top, .bottom], 20)
        }
    }
}


struct RoundedRectangleButtonStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    HStack {
      Spacer()
      configuration.label.foregroundColor(.black)
      Spacer()
    }.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    .frame(width: 180)
    .background(Color.white.cornerRadius(8))
    .scaleEffect(configuration.isPressed ? 0.95 : 1)
  }
}

struct TurquoiseRoundedRectangleButtonStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    HStack {
      Spacer()
      configuration.label.foregroundColor(.white)
      Spacer()
    }.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    .frame(width: 180)
    .background(turquoise.opacity(1).cornerRadius(8))
    .scaleEffect(configuration.isPressed ? 0.95 : 1)
  }
}

struct DarkGreenRoundedRectangleButtonStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    HStack {
      Spacer()
      configuration.label.foregroundColor(greenDark)
      Spacer()
    }.padding(EdgeInsets(top: 10, leading: 0, bottom: 10, trailing: 0))
    .frame(width: 180)
    .background(Color.black.opacity(0.7).cornerRadius(8))
    .scaleEffect(configuration.isPressed ? 0.95 : 1)
  }
}
//
//struct Test_Previews: PreviewProvider {
//    static var previews: some View {
//        SettingsPopup()
//    }
//}


