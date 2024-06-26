/////////////////////////////
// init codemirror
/////////////////////////////
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


/////////////////////////////
// init stuff
/////////////////////////////
import * as codeEditor from './scripts/ui/editor-manager';
const editors = codeEditor.init(CodeMirror);
import * as configManager from './scripts/utils/config-manager';
configManager.setAppMode('production');
// configManager.setAppMode('development');

import * as uiManager from './scripts/ui/ui-manager';
import * as sessionManager from './scripts/utils/session-manager';
import * as authService from './scripts/services/auth-service';
import './styles/style.scss';


/////////////////////////////////////////
// declarations
/////////////////////////////////////////
const previousEditorData = sessionManager.restoreEditorData();


/////////////////////////////////////////
// main()
/////////////////////////////////////////
uiManager.checkMediaQuery()
uiManager.handleTabsClick();
uiManager.handleResizer();
uiManager.handleInputMenu();

authService.authorizeApp(
    () => {
    console.log('APP AUTHORIZED');
    uiManager.restorePreviousEditorState(previousEditorData, editors);
    uiManager.listenEditorsChanges(previousEditorData, editors);
    uiManager.listenOnClickRun(previousEditorData, editors);
    },
  (err) => console.log('CANNOT AUTHORIZE APP:', err)
);


/////////////////////////////////////////
// functions
/////////////////////////////////////////
