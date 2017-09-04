
H5PEditor.widgets.geogebra_editor = H5PEditor.GeogebraEditor = (function ($) {

  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.geogebra = undefined;
  }
   
  C.prototype.appendTo = function ($container) {
    var data = h5p_get_data_obj(this.params);

    var el = build("div", "kekule_wrapper");
    $container.append(el);
    var el_applet_container = build("div", undefined, el);
    el_applet_container.id = random_string();

    this.geogebra = new geogebra_wrapper(el_applet_container, "editor");

    //  load mode
    var mode = "Figure";
    if (data !== undefined && data.mode !== undefined && data.mode.length != 0) mode = data.mode;
    this.menu = build_radio_menu(["Figure", "Match"], mode);
    el.appendChild(this.menu); 

    //  load data
    if (data !== undefined && data.data !== undefined) {
      this.geogebra.data = data.data;
    }
  };


  C.prototype.save = function() {
    var data = {
      "data" : this.geogebra.data, 
      "mode" : this.menu.getAttribute("data-selected"),
      "elements" : this.geogebra.get_elements()
    };
    this.params = h5p_get_data_str(data);
    this.setValue(this.field, this.params);
  };


  C.prototype.validate = function () { this.save(); return true; };
  C.prototype.remove = function () {};
 
  return C;
})(H5P.jQuery);



