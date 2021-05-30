define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  calculatedFieldsDesigner: {
    dialog: {
      dialog: 'calculatedFieldsDesignerDialog',
      itemsList: 'calculatedFieldsDesignerItemsList',
      nameEditInput: 'calculatedFieldsDesignerNameEditInput',
      updateButton: 'calculatedFieldsDesignerUpdateButton',
      createButton: 'calculatedFieldsDesignerCreateButton',
      cancelButton: 'calculatedFieldsDesignerCancelButton',
      validationButton: 'calculatedFieldsDesignerValidationButton',
      cancelValidationButton: 'calculatedFieldsDesignerCancelValidationButton'
    },
    operators: {
      addButton: 'calculatedFieldsDesignerOperatorAddButton',
      subtractButton: 'calculatedFieldsDesignerOperatorSubtractButton',
      multiplyButton: 'calculatedFieldsDesignerOperatorMultiplyButton',
      divideButton: 'calculatedFieldsDesignerOperatorDivideButton',
      percentButton: 'calculatedFieldsDesignerOperatorPercentButton',
      parenLeftButton: 'calculatedFieldsDesignerOperatorParenLeftButton',
      parenRightButton: 'calculatedFieldsDesignerOperatorParenRightButton',
      operatorColonButton: 'calculatedFieldsDesignerOperatorColonButton',
      operatorAndButton: 'calculatedFieldsDesignerOperatorAndButton',
      operatorOrButton: 'calculatedFieldsDesignerOperatorOrButton',
      operatorNotButton: 'calculatedFieldsDesignerOperatorNotButton',
      operatorInButton: 'calculatedFieldsDesignerOperatorInButton',
      operatorEqualButton: 'calculatedFieldsDesignerOperatorEqualButton',
      operatorNotEqualButton: 'calculatedFieldsDesignerOperatorNotEqualButton',
      operatorGreaterThanButton: 'calculatedFieldsDesignerOperatorGreaterThanButton',
      operatorLessThanButton: 'calculatedFieldsDesignerOperatorLessThanButton',
      operatorGreaterEqualButton: 'calculatedFieldsDesignerOperatorGreaterEqualButton',
      operatorLessEqualButton: 'calculatedFieldsDesignerOperatorLessEqualButton'
    },
    search: {
      search: 'calculatedFieldsDesignerSearch'
    },
    expressionEditor: {
      editorInput: 'calculatedFieldsDesignerExpressionEditorInput'
    },
    confirmationDialog: {
      dialogTitle: 'calculatedFieldsDesignerConfirmationDialog'
    }
  },
  derivedTablesDesigner: {
    main: {
      createInput: 'derivedTablesDesignerCreateDerivedTableNameInput',
      createQueryInput: 'derivedTablesDesignerCreateDerivedTablesQueryInput',
      runQueryButton: 'derivedTablesDesignerRunQueryButton',
      runQueryCancelButton: 'derivedTablesDesignerRunQueryCancelButton',
      cancelCreateOrUpdateButton: 'derivedTablesDesignerCancelCreateOrUpdateButton',
      createButton: 'derivedTablesDesignerCreateDerivedTableButton',
      updateButton: 'derivedTablesDesignerUpdateDerivedTableButton',
      cancelButton: 'derivedTablesDesignerCancelButton',
      dialog: 'derivedTablesDesignerDialog',
      fieldsItemTree: 'derivedTablesDesignerFieldsItemTree'
    }
  },
  metadataDesigner: {
    sourceTreeSearch: {
      search: 'metadataDesignerSourceTreeSidebarSearch'
    },
    resultTreeSearch: {
      search: 'metadataDesignerResultTreeSidebarSearch'
    },
    schemaAttribute: {
      input: 'metadataDesignerSchemaAttributeInput',
      addButton: 'metadataDesignerAddSchemaAttributeButton',
      updateButton: 'metadataDesignerUpdateSchemaAttributeButton',
      cancelButton: 'metadataDesignerCancelEditSchemaAttributeButton'
    },
    resourcesListInstructions: {
      instructionsList: 'metadataDesignerResourcesInstructionsList'
    },
    resourcesListSourceMetadata: {
      resourcesList: 'metadataDesignerSourceMetadataResourcesList'
    },
    resourcesListResultMetadata: {
      resourcesList: 'metadataDesignerResultMetadataResourcesList'
    },
    sidebarSearch: {
      search: 'metadataDesignerSidebarSearch'
    },
    swapButtons: {
      moveToResult: 'metadataDesignerMoveToResultButton',
      moveToSource: 'metadataDesignerMoveToSourceButton'
    },
    missingOrChildlessObjectsConfirmationDialog: {
      warningDialog: 'missingOrChildlessObjectsConfirmationDialog',
      primaryButton: 'missingOrChildlessObjectsConfirmationDialogPrimaryActionButton',
      secondaryButton: 'missingOrChildlessObjectsConfirmationDialogSecondaryActionButton'
    }
  },
  joinsDesigner: {
    search: {
      search: 'joinsDesignerSearch'
    },
    table: {
      table: 'joinsDesignerTable'
    },
    join: {
      menuOptionsButton: 'joinsDesignerJoinMenuOptionsButton',
      removeJoinButton: 'joinsDesignerRemoveJoinButton'
    },
    sidebar: {
      joinsDesignerSidebarResourcesTree: 'joinsDesignerSidebarResourcesTree',
      joinsDesignerEmptySidebarResourcesTree: 'joinsDesignerEmptySidebarResourcesTree',
      joinsDesignerSidebarJoinTree: 'joinsDesignerSidebarJoinTree'
    },
    complexJoinExpression: {
      removeButton: 'joinsDesignerComplexJoinExpressionRemoveJoinButton'
    },
    complexJoinHeader: {
      removeButton: 'joinsDesignerComplexJoinHeaderRemoveJoinButton'
    },
    constantJoinExpression: {
      menuOptionsButton: 'joinsDesignerConstantJoinExpressionMenuOptionsButton',
      removeConstantJoinButton: 'joinsDesignerConstantJoinExpressionRemoveConstantJoinButton'
    },
    constantJoinExpressionDialog: {
      expressionEditorDialog: 'joinsDesignerConstantJoinExpressionEditorDialog',
      expressionEditorInput: 'joinsDesignerConstantJoinExpressionEditorInput',
      mainActionButton: 'joinsDesignerConstantJoinExpressionDialogMainActionButton',
      cancelButton: 'joinsDesignerConstantJoinExpressionDialogCancelButton',
      validateButton: 'joinsDesignerConstantJoinExpressionValidateButton',
      cancelValidationButton: 'joinsDesignerConstantJoinExpressionCancelValidationButton'
    },
    joinTree: {
      menuOptionsButton: 'joinTreeMenuOptionsButton',
      removeJoinTreeButton: 'joinsDesignerRemoveJoinTreeButton'
    },
    joinAlias: {
      removeJoinAliasButton: 'joinsDesignerRemoveJoinAliasButton'
    },
    joinExpression: {
      removeJoinExpressionButton: 'joinsDesignerRemoveJoinExpressionButton'
    },
    sidebarSearch: {
      search: 'joinsDesignerSidebarSearch'
    },
    renameTableDialog: {
      dialogName: 'joinsDesignerRenameTableDialog',
      input: 'joinsDesignerRenameTableDialogInput'
    },
    renameJoinTreeDialog: {
      dialogName: 'joinsDesignerRenameJoinTreeDialog',
      input: 'joinsDesignerRenameDataIslandDialogInput'
    },
    joinGenerationConfirmationDialog: {
      dialogTitle: 'joinsDesignerJoinGenerationConfirmationDialog'
    },
    saveConstantJoinConfirmationDialog: {
      dialogTitle: 'joinsDesignerSaveConstantJoinConfirmationDialog'
    },
    alertDialog: {
      dialogTitle: 'joinsDesignerAlertDialog'
    },
    attentionDialog: {
      dialogName: 'joinsDesignerAttentionDialog',
      closeButtonName: 'joinsDesignerAttentionDialogCloseButton'
    }
  },
  filtersDesigner: {
    search: {
      search: 'filtersDesignerSearch'
    },
    table: {
      table: 'filtersDesignerTable'
    },
    cellActions: {
      editButton: 'filtersDesignerEditFilter',
      deleteButton: 'filtersDesignerDeleteFilter'
    },
    rangeValueEditor: {
      rangeStartInput: 'filtersDesignerDraftFilterValueEditorRangeStartInput',
      rangeEndInput: 'filtersDesignerDraftFilterValueEditorRangeEndInput'
    },
    optionsMenu: {
      menuOptionsButton: 'filtersDesignerDraftFilterMenuOptionsButton'
    },
    actionButtons: {
      okButton: 'filtersDesignerDraftFilterOkButton',
      cancelButton: 'filtersDesignerDraftFilterCancelButton'
    },
    dateTimeRangeValueEditor: {
      rangeStartInput: 'filtersDesignerDraftFilterValueEditorDateTimeInput',
      rangeEndInput: 'filtersDesignerDraftFilterValueEditorDateTimePickerButton',
      rangeEndButton: 'filtersDesignerDraftFilterValueEditorDateTimeRangeEndButton'
    },
    dateTimeInputValueEditor: {
      dateTimeInput: 'filtersDesignerDraftFilterValueEditorDateTimeInput',
      dateTimePickerButton: 'filtersDesignerDraftFilterValueEditorDateTimePickerButton'
    },
    textInputValueEditor: {
      valueEditorInput: 'filtersDesignerDraftFilterValueEditorInput'
    },
    sidebarSearch: {
      search: 'filtersDesignerSidebarSearch'
    }
  },
  presentationDesigner: {
    search: {
      search: 'presentationDesignerSearch'
    },
    table: {
      table: 'presentationDesignerTable'
    },
    treeNode: {
      singleItemTree: 'presentationDesignerSelectItemTree',
      itemsTree: 'presentationDesignerPresentationItemsTree'
    },
    togglePropertiesEditor: {
      togglePropertiesEditor: 'presentationDesignerTogglePropertiesEditor'
    },
    removeItem: {
      removeButton: 'presentationDesignerRemovePresentationItemButton'
    },
    propertyEditor: {
      editorInput: 'presentationDesignerPropertyEditorInput'
    },
    dataIslandOrSet: {
      columnSetLabel: 'presentationDesignerPropertyEditorColumnSetLabel',
      columnSetId: 'presentationDesignerPropertyEditorColumnSetId',
      columnSetDescription: 'presentationDesignerPropertyEditorColumnSetDescription',
      columnSetLabelKey: 'presentationDesignerPropertyEditorColumnSetLabelKey',
      columnSetDescriptionKey: 'presentationDesignerPropertyEditorColumnSetDescriptionKey',
      columnSetSource: 'presentationDesignerPropertyEditorColumnSetSource',
      columnSetAggregation: 'presentationDesignerPropertyEditorColumnSetAggregation',
      columnSetKind: 'presentationDesignerPropertyEditorColumnSetKind',
      columnSetMask: 'presentationDesignerPropertyEditorColumnSetMask'
    },
    controls: {
      addSetButton: 'presentationDesignerControlsAddSetButton',
      moveToTopButton: 'presentationDesignerControlsMoveToTopButton',
      moveUpButton: 'presentationDesignerControlsMoveUpButton',
      moveDownButton: 'presentationDesignerControlsMoveDownButton',
      moveToBottomButton: 'presentationDesignerControlsMoveToBottomButton'
    },
    header: {
      menuOptionsButton: 'presentationDesignerHeaderCanvasMenuOptionsButton'
    },
    sidebarSearch: {
      search: 'presentationDesignerSidebarSearch'
    },
    selectPropertiesCollapsed: {
      fieldTypeSelect: 'presentationDesignerSelectPropertyCollapsedFieldTypeSelect',
      summaryCalculationSelect: 'presentationDesignerSelectPropertyCollapsedSummaryCalculationSelect',
      dataFormatSelect: 'presentationDesignerSelectPropertyCollapsedDataFormatSelect'
    },
    selectPropertiesExpanded: {
      fieldTypeSelect: 'presentationDesignerSelectPropertyExpandedFieldTypeSelect',
      summaryCalculationSelect: 'presentationDesignerSelectPropertyExpandedSummaryCalculationSelect',
      dataFormatSelect: 'presentationDesignerSelectPropertyExpandedDataFormatSelect'
    }
  },
  securityDesigner: {
    securityFileUploadDialog: {
      fileUploadDialog: 'securityDesignerSecurityFileUploadDialog',
      primaryButton: 'securityDesignerSecurityFilePrimaryActionButton',
      secondaryButton: 'securityDesignerSecurityFileSecondaryActionButton'
    },
    downloadBundleTemplateDialog: {
      downloadBundleTemplateDialog: 'securityDesignerDownloadBundleTemplateDialog',
      dialogOkButton: 'securityDesignerDownloadBundleTemplateDialogOkButton',
      dialogCancelButton: 'securityDesignerDownloadBundleTemplateDialogCancelButton',
      autoGenerateLabelKeyInput: 'securityDesignerAutoGenerateLabelKeyInput',
      autoGenerateDescriptionKeyInput: 'securityDesignerAutoGenerateDescriptionKeyInput'
    }
  },
  optionsDesigner: {
    securityFileUploadDialog: {
      fileUploadDialog: 'optionsDesignerSecurityFileUploadDialog',
      primaryButton: 'optionsDesignerSecurityFilePrimaryActionButton',
      secondaryButton: 'optionsDesignerSecurityFileSecondaryActionButton'
    },
    schemaUploadDialog: {
      uploadDialog: 'optionsDesignerSchemaUploadDialog',
      primaryButton: 'optionsDesignerUploadDialogPrimaryActionButton',
      secondaryButton: 'optionsDesignerUploadDialogSecondaryActionButton'
    },
    securityFile: {
      table: 'optionsDesignerSecurityFileTable',
      downloadButton: 'optionsDesignerDownloadSecurityFileButton',
      deleteButton: 'optionsDesignerDeleteSecurityFileButton',
      replaceButton: 'optionsDesignerReplaceSecurityFileButton'
    },
    replaceBundleDialog: {
      replaceBundleDialog: 'optionsDesignerReplaceBundleDialog',
      replaceButton: 'optionsDesignerReplaceBundlesDialogReplaceButton',
      selectNewFilesButton: 'optionsDesignerReplaceBundlesDialogSelectNewFilesButton',
      cancelButton: 'optionsDesignerReplaceBundlesDialogCancelButton'
    },
    multipleFileUpload: {
      table: 'optionsDesignerMultipleFileUploadTable',
      emptyFilesInput: 'optionsDesignerMultipleFileUploadEmptyFilesInput',
      removeFileButton: 'optionsDesignerMultipleFileUploadRemoveFileButton',
      fileUploadInput: 'optionsDesignerMultipleFileUploadInput',
      emptyFileButton: 'optionsDesignerMultipleFileUploadEmptyFilesButton',
      fileUploadButton: 'optionsDesignerMultipleFileUploadButton'
    },
    bundleItem: {
      downloadBundleButton: 'optionsDesignerDownloadBundleButton',
      deleteBundleButton: 'optionsDesignerDeleteBundleButton'
    },
    bundlesList: {
      downloadBundleButton: 'optionsDesignerDownloadBundleButton',
      addLocaleBundleButton: 'optionsDesignerAddLocaleBundleButton',
      table: 'optionsDesignerBundlesListTable'
    },
    bundlesUploadDialog: {
      uploadBundleDialog: 'optionsDesignerUploadBundleDialog',
      primaryButton: 'optionsDesignerBundleUploadDialogPrimaryActionButton',
      secondaryButton: 'optionsDesignerBundleUploadDialogSecondaryActionButton'
    },
    downloadBundleTemplateDialog: {
      downloadBundleTemplateDialog: 'optionsDesignerDownloadBundleTemplateDialog',
      dialogOkButton: 'optionsDesignerDownloadBundleTemplateDialogOkButton',
      dialogCancelButton: 'optionsDesignerDownloadBundleTemplateDialogCancelButton',
      autoGenerateLabelKeyInput: 'optionsDesignerAutoGenerateLabelKeyInput',
      autoGenerateDescriptionKeyInput: 'optionsDesignerAutoGenerateDescriptionKeyInput'
    },
    emptyBundles: {
      addLocaleBundleButton: 'optionsDesignerEmptyBundlesAddLocaleBundleButton'
    },
    emptySecurityFile: {
      addSecurityFileButton: 'optionsDesignerEmptySecurityFileAddSecurityFileButton'
    },
    singleFileUpload: {
      fileUploadInput: 'optionsDesignerSingleFileUploadInput',
      fileUploadButton: 'optionsDesignerSingleFileUploadButton'
    },
    bundlesUploadDialogRepositoryResourceChooser: {
      toggleSearchResultModeToTreeButton: 'bundlesUploadDialogRepositoryResourceChooserToggleSearchResultModeToTreeButton',
      toggleSearchResultModeToListButton: 'bundlesUploadDialogRepositoryResourceChooserToggleSearchResultModeToListButton',
      searchContainerInput: 'bundlesUploadDialogRepositoryResourceChooserSearchContainerInput',
      resetSearchKeywordButton: 'bundlesUploadDialogRepositoryResourceChooserResetSearchKeywordButton',
      submitSearchKeywordButton: 'bundlesUploadDialogRepositoryResourceChooserSubmitSearchKeywordButton',
      treeModeList: 'bundlesUploadDialogRepositoryResourceChooserTreeModeList',
      listModeList: 'bundlesUploadDialogRepositoryResourceChooserListModeList'
    },
    securityFileRepositoryResourceChooser: {
      toggleSearchResultModeToTreeButton: 'securityFileRepositoryResourceChooserToggleSearchResultModeToTreeButton',
      toggleSearchResultModeToListButton: 'securityFileRepositoryResourceChooserToggleSearchResultModeToListButton',
      searchContainerInput: 'securityFileRepositoryResourceChooserSearchContainerInput',
      resetSearchKeywordButton: 'securityFileRepositoryResourceChooserResetSearchKeywordButton',
      submitSearchKeywordButton: 'securityFileRepositoryResourceChooserSubmitSearchKeywordButton',
      treeModeList: 'securityFileRepositoryResourceChooserTreeModeList',
      listModeList: 'securityFileRepositoryResourceChooserListModeList'
    },
    bundlesUploadDialogRepositoryResourceChooserTree: {
      tree: 'bundlesUploadDialogRepositoryResourceChooserTree'
    },
    bundlesUploadDialogRepositoryResourceChooserList: {
      list: 'bundlesUploadDialogRepositoryResourceChooserList'
    },
    securityFileRepositoryResourceChooserTree: {
      tree: 'securityFileRepositoryResourceChooserTree'
    },
    securityFileRepositoryResourceChooserList: {
      list: 'securityFileRepositoryResourceChooserList'
    }
  },
  validation: {
    tree: {
      tree: 'validationTree'
    },
    domainDependenciesInspector: {
      dialog: 'validationDomainDependenciesInspectorDialog',
      confirmButton: 'validationDomainDependencyInspectorConfirmButton',
      rejectButton: 'validationDomainDependencyInspectorRejectButton'
    },
    domainDesignerDependenciesInspector: {
      dialog: 'validationDomainDesignerDependenciesInspectorDialog',
      confirmButton: 'validationDomainDesignerDependencyInspectorConfirmButton',
      rejectButton: 'validationDomainDesignerDependencyInspectorRejectButton'
    },
    leftTreeVirtualData: {
      virtualDataList: 'validationDependenciesLeftTreeVirtualDataList',
      virtualDataTree: 'validationDependenciesLeftTreeVirtualDataTree'
    },
    rightTreeVirtualData: {
      virtualDataList: 'validationDependenciesRightTreeVirtualDataList',
      virtualDataTree: 'validationDependenciesRightTreeVirtualDataTree'
    },
    errorDialog: {
      errorDialog: 'validationErrorDialog',
      confirmLabelButton: 'validationConfirmLabelButton',
      rejectLabelButton: 'validationRejectLabelButton'
    },
    saveDialog: {
      dialogTitle: 'validationSaveDialog',
      input: 'validationSaveDialogInput',
      textarea: 'validationSaveDialogTextarea'
    },
    warningDialog: {
      warningDialog: 'validationWarningDialog',
      primaryButton: 'validationWarningDialogPrimaryActionButton',
      secondaryButton: 'validationWarningDialogSecondaryActionButton'
    },
    schemaMapping: {
      dialogName: 'validationSchemaMappingDialog',
      dialogExistingList: 'validationSchemaMappingDialogExistingList',
      dialogExistingSchemasTree: 'validationSchemaMappingDialogExistingSchemasTree',
      linkButton: 'validationSchemaMappingDialogLinkButton',
      unlinkButton: 'validationSchemaMappingDialogUnlinkButton',
      availableList: 'validationSchemaMappingDialogAvailableList',
      availableTree: 'validationSchemaMappingDialogAvailableTree',
      dialogList: 'validationSchemaMappingDialogList',
      dialogTree: 'validationSchemaMappingDialogTree',
      confirmButton: 'validationSchemaMappingDialogConfirmButton',
      rejectButton: 'validationSchemaMappingDialogRejectButton'
    }
  },
  common: {
    loaderDialog: {
      loaderDialog: 'loaderDialog',
      cancelButton: 'loaderDialogCancelButton'
    },
    loaderDialogWithCancel: {
      loaderDialog: 'loaderDialogWithCancel',
      cancelButton: 'loaderDialogCancelButton'
    },
    repositoryResourceChooserTree: {
      tree: 'repositoryResourceChooserTree'
    },
    repositoryResourceChooserList: {
      list: 'repositoryResourceChooserList'
    },
    repositoryResourceChooser: {
      toggleSearchResultModeToTreeButton: 'repositoryResourceChooserToggleSearchResultModeToTreeButton',
      toggleSearchResultModeToListButton: 'repositoryResourceChooserToggleSearchResultModeToListButton',
      searchContainerInput: 'repositoryResourceChooserSearchContainerInput',
      resetSearchKeywordButton: 'repositoryResourceChooserResetSearchKeywordButton',
      submitSearchKeywordButton: 'repositoryResourceChooserSubmitSearchKeywordButton',
      treeModeList: 'repositoryResourceChooserTreeModeList',
      listModeList: 'repositoryResourceChooserListModeList'
    },
    repositoryResourceChooserDialog: {
      resourceChooserDialog: 'repositoryResourceChooserDialog',
      confirmSelectionButton: 'repositoryResourceChooserConfirmSelectionButton',
      rejectSelectionButton: 'repositoryResourceChooserRejectSelectionButton'
    },
    menuView: {
      saveMenuButton: 'menuViewSaveMenuOptionsButton',
      exportSchemaButton: 'menuViewExportSchemaOptionsButton',
      importSchemaButton: 'menuViewImportSchemaOptionsButton',
      undoButton: 'menuViewUndoButton',
      redoButton: 'menuViewRedoButton',
      undoAllButton: 'menuViewUndoAllButton'
    },
    designerSwitcher: {
      switchToDataManagementButton: 'designerSwitcherSwitchToDataManagementButton',
      switchToDataIslandsButton: 'designerSwitcherSwitchToDataIslandsButton',
      switchToPreFiltersButton: 'designerSwitcherSwitchToPreFiltersButton',
      switchToPresentationButton: 'designerSwitcherSwitchToPresentationButton',
      switchToOptionsButton: 'designerSwitcherSwitchToOptionsButton',
      switchToSecurityButton: 'designerSwitcherSwitchToSecurityButton'
    },
    clearAllDataConfirmationDialog: {
      dialogTitle: 'clearAllDataConfirmationDialog'
    },
    removeTableConfirmationDialog: {
      dialogTitle: 'removeTableConfirmationDialog'
    },
    draftStateConfirmationDialog: {
      dialogTitle: 'draftStateConfirmationDialog'
    }
  },
  sidebar: {
    options: {
      menuOptionsButton: 'sidebarDataSourceMenuOptionsButton'
    }
  }
};

});