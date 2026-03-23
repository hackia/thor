import XCTest
import SwiftTreeSitter
import TreeSitterMaat

final class TreeSitterMaatTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_maat())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Maat grammar")
    }
}
