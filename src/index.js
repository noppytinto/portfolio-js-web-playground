import 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import CodeMirror from 'codemirror';
import * as codeEditor from './scripts/ui/editor-manager';
const [htmlEditor, cssEditor, jsEditor] = codeEditor.init(CodeMirror);

import * as configManager from './scripts/utils/config-manager';
configManager.setAppMode('production');

import * as uiManager from './scripts/ui/ui-manager';
import * as sessionManager from './scripts/utils/session-manager';
import * as authService from './scripts/services/auth-service';
import './styles/style.scss';



/////////////////////////////////////////
// dom elements
/////////////////////////////////////////
// const outputSection = document.querySelector('.output');
// const iframe = document.querySelector('#output__canvas');



/////////////////////////////////////////
// declarations
/////////////////////////////////////////
const previousSessionData = sessionManager.restore();
const pageData = {
    htmlCode: previousSessionData.htmlCode ?? '',
    cssCode: previousSessionData.cssCode ?? '',
    jsCode: previousSessionData.jsCode ?? '',
}



/////////////////////////////////////////
// main()
/////////////////////////////////////////
uiManager.checkMediaQuery()
uiManager.handleTabsClick();
uiManager.handleResizer();

authService.authorizeApp(() => {
    console.log('APP AUTHORIZED');
    uiManager.restorePreviousViewState(pageData, {htmlEditor, cssEditor, jsEditor});
    uiManager.listenEditorsChanges(pageData, {htmlEditor, cssEditor, jsEditor});
});



/////////////////////////////////////////
// functions
/////////////////////////////////////////
