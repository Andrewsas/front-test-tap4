export const RH_URL = 'http://127.0.0.1:8000/';

export const Constant = {
  BASE_URL: RH_URL + 'api/',
  SEARCH: 'search?',
  FRAMEWORK: 'framework/',
  LANGUAGE: 'language/'
};

export const MessageType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'danger'
};

export const MessageText = {
  SAVE: 'messageText.save',
  EDIT: 'messageText.edit',
  DELETE: 'messageText.delete',
  ERROR: 'messageText.error',
  EXPORTERROR: 'export.error',
  IMPORTERROR: 'import.error',
  FILEINVALID: 'file.invalid',
  FILESELECT: 'file.select',
  FILESIZE: 'file.size',
  IMPORTSUCCESS: 'import.success',
  EXPORTSUCCESS: 'export.success',
  NOTNET: 'notenet',
  ATTENTION: 'attention',
  AUTHORIZATION: 'authorization',
  RECOVERY: 'recovery',
  NOTSERVE: 'notserve'
};

export const IconType = {
  SAVE: 'save',
  UPDATE: 'edit',
  NOTIFICATION: 'notifications',
  ERROR: 'cancel',
  DELETE: 'delete'
};

export const AlertMsg = {
  CONFIRM: {
    SAVE: {
      titleRequest: 'alert.confirm.save.titleRequest',
      text: 'alert.confirm.save.text',
      buttonConfirm: 'alert.confirm.save.buttonConfirm',
      buttonCancel: 'alert.confirm.save.buttonCancel'
    },
    EDIT: {
      titleRequest: 'alert.confirm.edit.titleRequest',
      text: 'alert.confirm.edit.text',
      buttonConfirm: 'alert.confirm.edit.buttonConfirm',
      buttonCancel: 'alert.confirm.edit.buttonCancel'
    },
    DELETE: {
      titleRequest: 'alert.confirm.delete.titleRequest',
      text: 'alert.confirm.delete.text',
      buttonConfirm: 'alert.confirm.delete.buttonConfirm',
      buttonCancel: 'alert.confirm.delete.buttonCancel'
    },
    CANCEL: {
      titleRequest: 'alert.confirm.cancel.titleRequest',
      text: 'alert.confirm.cancel.text',
      buttonConfirm: 'alert.confirm.cancel.buttonConfirm',
      buttonCancel: 'alert.confirm.cancel.buttonCancel'
    }
  },
  SUCCESS: {
    titleRequest: 'alert.success.titleRequest',
    text: 'alert.success.text',
    type: 'success'
  },
  CANCEL: {
    titleRequest: 'alert.cancel.titleRequest',
    text: 'alert.cancel.text',
    type: 'error'
  },
  WARNING: {
    titleRequest: 'Atenção !',
    text: 'alert.warning.text',
    type: 'warning'
  }
};

export const CUSTOM_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

