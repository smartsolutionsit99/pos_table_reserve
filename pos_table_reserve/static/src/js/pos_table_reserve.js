odoo.define('pos_table_reserve.pos_table_reserve', function (require) {
 "use strict";

    console.log("JS FILE");
    var PosBaseWidget = require('point_of_sale.BaseWidget');
    var chrome = require('point_of_sale.chrome');
    var gui = require('point_of_sale.gui');
    var models = require('point_of_sale.models');
    var screens = require('point_of_sale.screens');
    var core = require('web.core');
    var rpc = require('web.rpc');
    
    var QWeb = core.qweb;
    var _t = core._t;


    models.load_models({
    model: 'restaurant.table',
    fields: ['name','width','height','position_h','position_v','shape','floor_id','color','seats','color_org','reserved','reserve_note'],
    loaded: function(self,tables){
        self.tables_by_id = {};
        for (var i = 0; i < tables.length; i++) {
            self.tables_by_id[tables[i].id] = tables[i];
            var floor = self.floors_by_id[tables[i].floor_id[0]];
            if (floor) {
                floor.tables.pop(tables[i]);
                // floor.tables.push(tables[i]);
                tables[i].floor = false;
            }
        }
        for (var i = 0; i < tables.length; i++) {
            self.tables_by_id[tables[i].id] = tables[i];
            var floor = self.floors_by_id[tables[i].floor_id[0]];
            if (floor) {
                floor.tables.push(tables[i]);
                tables[i].floor = floor;
            }
        }
       },
     });

    var floors = require('pos_restaurant.floors');
    var TableWidget = floors.TableWidget;
    TableWidget.include({
            click_handler: function(){
                var floorplan = this.getParent();
                if (floorplan.editing){
                   this._super();
                } else{
                    if (this.table.reserved == true){
                    alert(_t("This Table Is Reserved"));
                }
                else{
                this._super();
                }
              }
            },
            table_style: function(){
                    var table = this.table;
                    function unit(val){ return '' + val + 'px'; }
                    var style = {
                        'width':        unit(table.width),
                        'height':       unit(table.height),
                        'line-height':  unit(table.height),
                        'margin-left':  unit(-table.width/2),
                        'margin-top':   unit(-table.height/2),
                        'top':          unit(table.position_v + table.height/2),
                        'left':         unit(table.position_h + table.width/2),
                        'border-radius': table.shape === 'round' ?
                                unit(Math.max(table.width,table.height)/2) : '3px',
                    };
                    if (table.color) {
                        style.background = table.color;
                    }

                    if (table.height >= 150 && table.width >= 150) {
                        style['font-size'] = '32px';
                    }

                    if (table.reserved == true) {
                        style.background = '#f72a3d';
                    }

                    return style;
                },
    });

    floors.FloorScreenWidget.include({
    tool_reserve_table: function(){
            var self = this;
            if (this.selected_table) {
                var self = this;
                this.gui.show_popup('textinput',{
                'title':_t('Reservation Note'),
                'cheap': true,
                'value': '',
                'confirm': function(note) {
                    rpc.query({
                        model: 'restaurant.table',
                        method: 'write',
                        args: [[self.selected_table.table.id], {'reserved':true,'color_org':self.selected_table.table.color,'reserve_note':note}],
                        })
                        .catch(function(error){
                            error.event.preventDefault();
                            var error_body = _t('Your Internet connection is probably down.');
                            if (error.message.data) {
                                var except = error.message.data;
                                error_body = except.arguments && except.arguments[0] || except.message || error_body;
                            }
                            self.gui.show_popup('error',{
                                'title': _t('Error: Could not Save Changes'),
                                'body': error_body,
                            });
                            contents.on('click','.button.save',function(){ self.save_client_details(partner); });
                        });
                    self.selected_table.table.reserve_note = note;
                    self.selected_table.table.reserved = true;
                    self.renderElement();
                  },
                });

            }
        },
        tool_unreserve_table: function(){
            if (this.selected_table) {
                rpc.query({
                    model: 'restaurant.table',
                    method: 'write',
                    args: [[this.selected_table.table.id], {'reserved':false,'color':this.selected_table.table.color_org,'reserve_note':''}],
                    })
                    .catch(function(error){
                            error.event.preventDefault();
                            var error_body = _t('Your Internet connection is probably down.');
                            if (error.message.data) {
                                var except = error.message.data;
                                error_body = except.arguments && except.arguments[0] || except.message || error_body;
                            }
                            self.gui.show_popup('error',{
                                'title': _t('Error: Could not Save Changes'),
                                'body': error_body,
                            });
                            contents.on('click','.button.save',function(){ self.save_client_details(partner); });
                      });
                this.selected_table.table.reserve_note = '';
                this.selected_table.table.color = this.selected_table.table.color_org
                this.selected_table.table.reserved = false;
                this.renderElement();
                }
            },
    renderElement: function(){
            console.log("new r e");
            this._super();
            var self = this;
            this.$('.edit-button.reserve').click(function(){
                console.log("reserve");
                self.tool_reserve_table();
            });
            this.$('.edit-button.unreserve').click(function(){
                console.log("unreserve");
                self.tool_unreserve_table();
            });


        },

    });





});
