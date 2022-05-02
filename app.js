const TOOLBAR_CONFIG = [
  { name: "document", items: ["Print"] },
  {
    name: "clipboard",
    items: [
      "Cut",
      "Copy",
      "Paste",
      "PasteText",
      "PasteFromWord",
      "-",
      "Undo",
      "Redo",
    ],
  },
  {
    name: "styles",
    items: ["Styles", "Format", "Font", "Fontsize"],
  },
  { name: "colors", items: ["TextColor", "BGColor"] },
  {
    name: "basicstyles",
    items: ["Bold", "Italic", "Underline", "Strike", "-", "RemoveFormat"],
  },
  {
    name: "find",
    items: ["Find", "Replace"],
  },
  {
    name: "paragraph",
    items: [
      "BulletedList",
      "-",
      "Outdent",
      "Indent",
      "-",
      "Blockquote",
      "-",
      "JustifyLeft",
      "JustifyCenter",
      "JustifyRight",
      "JustifyBlock",
    ],
  },
  {
    name: "links",
    items: ["Link", "Unlink"],
  },
  {
    name: "insert",
    items: ["Image", "Table"],
  },
  {
    name: "tools",
    items: ["Maximize"],
  },
  {
    name: "editing",
    items: ["Scayt"],
  },
];

ko.bindingHandlers.ckeditor = {
  init: function (
    element,
    valueAccessor,
    allBindings,
    viewModel,
    bindingContext
  ) {
    const options = ko.utils.extend(
      {
        toolbar: TOOLBAR_CONFIG,
        removePlugins: "elementspath",
        // Configure your file manager integration. This example uses CKFinder 3 for PHP.
        filebrowserBrowseUrl: "/apps/ckfinder/3.4.5/ckfinder.html",
        filebrowserImageBrowseUrl:
          "/apps/ckfinder/3.4.5/ckfinder.html?type=Images",
        filebrowserUploadUrl:
          "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files",
        filebrowserImageUploadUrl:
          "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images",

        // Upload dropped or pasted images to the CKFinder connector (note that the response type is set to JSON).
        uploadUrl:
          "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",

        // Reduce the list of block elements listed in the Format drop-down to the most commonly used.
        format_tags: "p;h1;h2;h3;pre",
        // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
        removeDialogTabs: "image:advanced;link:advanced",

        height: 450,
        removeButtons: "PasteFromWord",
      },
      allBindings.get("ckeditorOptions") || {}
    );
    const modelValue = valueAccessor();

    const editor = CKEDITOR.replace(element, options);

    editor.on("change", function () {
      modelValue(editor.getData());
    });

    //handle disposal (if KO removes by the template binding)
    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
      if (editor) {
        CKEDITOR.remove(editor);
      }
    });
  },
  update: function (
    element,
    valueAccessor,
    allBindings,
    viewModel,
    bindingContext
  ) {
    const editor = new CKEDITOR.dom.element(element).getEditor();
    editor.setData(ko.unwrap(valueAccessor()), null, true);
  },
};

const viewModel = (function () {
  const self = {};

  self.items = ko.observableArray();

  self.items.push({
    content: ko.observable(new Date().toISOString()),
  });
  //   self.add = function () {
  //     self.items.push({
  //       content: ko.observable(new Date().toISOString()),
  //     });
  //   };

  self.save = function () {
    console.log(JSON.stringify(ko.toJS(self.items)[0]), null, 4);
  };

  return self;
})();

ko.applyBindings(viewModel);
