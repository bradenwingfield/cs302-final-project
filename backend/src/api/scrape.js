var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var axios = require('axios');
var cheerio = require('cheerio');
//keep track of visitedUrls
var visitedUrls = new Set();
//Base URL 
var baseUrl = 'https://casetext.com/statute/tennessee-code/title-1-code-and-statutes/chapter-1-code-commission';
//Delay to not overwhelm server
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
// Recursive function to scrape the website
function scrapePage(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, $_1, title, text, links, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (visitedUrls.has(url))
                        return [2 /*return*/]; // Avoid revisiting
                    visitedUrls.add(url);
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    console.log("Scraping: ".concat(url));
                    return [4 /*yield*/, axios.get(url)];
                case 3:
                    response = _a.sent();
                    $_1 = cheerio.load(response.data);
                    title = $_1('span.title').text().trim();
                    text = $_1('section');
                    console.log("Title: ".concat(title || 'No Title Found'));
                    console.log(text);
                    links = $_1('a.item-content[href]');
                    if (links.length === 0) {
                        console.log("No more links on ".concat(url, ". Section complete."));
                        return [2 /*return*/];
                    }
                    links.each(function (_, element) { return __awaiter(_this, void 0, void 0, function () {
                        var link, fullUrl, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    link = $_1(element).attr('href');
                                    console.log("Found link: ".concat(link));
                                    if (!(link && link.startsWith('statute/tennessee-code/title-1-code-and-statutes/chapter-1-code-commission'))) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    fullUrl = new URL(link, baseUrl).href;
                                    console.log("Following link: ".concat(fullUrl));
                                    return [4 /*yield*/, scrapePage(fullUrl)];
                                case 2:
                                    _a.sent(); // Recursive call
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.error("Invalid URL: ".concat(link), e_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error scraping ".concat(url, ":"), error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Start scraping from the base URL
scrapePage(baseUrl);
