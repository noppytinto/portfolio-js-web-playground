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
import * as codeEditor from './scripts/editor-service';
const [htmlEditor, cssEditor, jsEditor] = codeEditor.init(CodeMirror);

import * as configService from './scripts/services/config-service';
configService.setAppMode('development');

import * as uiService from './scripts/services/ui-service';
import * as session from './scripts/session';
import * as adminService from './scripts/services/admin-service';
import './styles/style.scss';



/////////////////////////////////////////
// dom elements
/////////////////////////////////////////
// const outputSection = document.querySelector('.output');
// const iframe = document.querySelector('#output__canvas');



/////////////////////////////////////////
// declarations
/////////////////////////////////////////
const previousSessionData = session.restore();
const pageData = {
    htmlCode: previousSessionData.htmlCode ?? '',
    cssCode: previousSessionData.cssCode ?? '',
    jsCode: previousSessionData.jsCode ?? '',
}



/////////////////////////////////////////
// main()
/////////////////////////////////////////
uiService.checkMediaQuery()
uiService.handleTabsClick();
uiService.handleResizer();

// adminService.authorizeApp(() => {
//     console.log('APP AUTHORIZED');
//     uiService.restorePreviousViewState(pageData, {htmlEditor, cssEditor, jsEditor});
//     uiService.listenEditorsChanges(pageData, {htmlEditor, cssEditor, jsEditor});
// });
//


/////////////////////////////////////////
// functions
/////////////////////////////////////////
