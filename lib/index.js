"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setToken = setToken;
exports.extractToken = extractToken;
function setToken(headers, token) {
    if (token) headers["authorization"] = `Bearer ${token}`;
}

function extractToken(headers) {
    const header = (headers || {})["authorization"];
    if (!header) return null;
    const match = header.match(/^Bearer (.+)$/);
    return match ? match[1] : null;
}

exports.default = { setToken, extractToken };