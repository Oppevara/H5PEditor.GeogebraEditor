
H5PEditor.widgets.geogebra_editor = H5PEditor.GeogebraEditor = (function ($) {

  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.data = h5p_get_data_obj(this.params);
    this.applet = undefined;
  }
   
  C.prototype.appendTo = function ($container) {
    this.applet = new geogebra_exercise("editor");
    this.applet.data = this.data;
    $container.append(this.applet.el);
  };


  C.prototype.save = function() {
    this.params = h5p_get_data_str(this.applet.data);
    this.setValue(this.field, this.params);
  };


  C.prototype.validate = function () { this.save(); return true; };
  C.prototype.remove = function () {};
 
  return C;
})(H5P.jQuery);



