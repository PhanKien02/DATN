import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Loading} from './Loading';

const loadingIds = [];
const loadingOverload = [];

function showLoading() {
    if (loadingIds.length > 0) {
        loadingOverload.push('');
    } else {
        const sibling = Loading;
        loadingIds.push(sibling);
    }
}

function hideLoading() {
    if (loadingOverload.length > 0) {
        loadingOverload.shift();
    } else {
        const sibling = loadingIds.shift();
        sibling.destroy();
    }
}

const dialogIds = [];

function hideDialog() {
    const dialogId = dialogIds.pop();
}

const siblings = [];
const BACK_DROP: ViewStyle = {
    width: responsive.WIDTH,
    height: responsive.HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
};

function showCustomDialog(component) {
    const sibling = Loading;
    siblings.push(sibling);
}

function updateCustomDialog(component) {
    const lastId = siblings.length - 1;
    lastId >= 0 &&
        siblings[lastId].update(<View style={BACK_DROP}>{component}</View>);
}

function hideCustomDialog() {
    const sibling = siblings.shift();
    sibling && sibling.destroy();
}

export {
    showLoading,
    hideLoading,
    hideDialog,
    showCustomDialog,
    hideCustomDialog,
    updateCustomDialog,
};
