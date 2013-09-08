// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var questions = {};
var selectedQuestion = null;
var selectedId = null;

function updateQuestion(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(question) {
    questions[tabId] = question;
    if (!question) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selectedId == tabId) {
        updateSelected(tabId);
      }
    }
  });
}

function updateSelected(tabId) {
  selectedQuestion = questions[tabId];
  if (selectedQuestion)
    chrome.pageAction.setTitle({tabId:tabId, title:selectedQuestion});
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateQuestion(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateQuestion(tabs[0].id);
});
