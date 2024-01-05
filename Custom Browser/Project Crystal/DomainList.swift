//
//  DomainList.swift
//  Project Crystal
//
//  Created by Nicholas Kang on 3/8/23.
//

import Foundation


// title: url
let tldList:[String] = [".com", ".net", ".org", ".jp", ".de", ".uk", ".fr", ".br", ".it", ".ru", ".es", ".me", ".gov", ".pl", ".ca", ".au", ".cn", ".co", ".in", ".nl", ".edu", ".info", ".eu", ".ch", ".id", ".at", ".kr", ".cz", ".mx", ".be", ".tv", ".se", ".tr", ".tw", ".al", ".ua", ".ir", ".vn", ".us", ".news", ".xyz", ".link", ".club", ".site", ".mobi", ".by", ".cat", ".wiki", ".xxx", ".jobs", ".online", ".pro", ".tips", ".app", ".io", ]

//let tldList = URL.


func hasTLD(_ s: String) -> Bool {
    for tld in tldList {
        if s.contains(tld) {
            return true
        }
    }
    
    return false
}
