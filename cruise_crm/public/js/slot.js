frappe.ui.form.on('Slot', {
    refresh: function (frm) {
       console.log('hello from slot')
    }
});

frappe.listview_settings['Slot'] = {
    hide_name_column: true
};