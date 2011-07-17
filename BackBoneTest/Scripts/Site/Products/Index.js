/*
backbone code
*/
var Product = Backbone.Model.extend({
    defaults: {
        Name : "add name",
        Price : 0,
        Description : "add description"
    },
    initialize: function() {
      if (!this.get("Name")) {
        this.set({"Name": this.defaults.Name});
      }
    },

    clear: function () {
        this.destroy();
        this.view.remove();
    }
});

var ProductStore = Backbone.Collection.extend({
    model: Product,
    url: "../../Products/List"
});

$(function () {

    /*
    var ProductController = Backbone.Controller.extend({
    routes: {
    "": "products"
    },
    productList: new ProductStore(),
    hostList: null,
    products: function () {
    this.productList.fetch();
    new ProductListView({ collection: this.productList, el: $("#products-table") });
    }
    });

    var App = {
    Views: {},
    Controllers: {},
    init: function () {
    new ProductController();
    Backbone.history.start();
    }
    };
    */
    /*
    "hosts/:id": "productFor"

    productFor: function (id) {
    this.hostList = new DnsHostStore([], { zoneId: id });
    var view = new DnsHostsList({ collection: this.hostList, el: $("#hosts") });
    this.hostList.fetch();
    }
    */
    /*
    var ProductListView = Backbone.View.extend({
        events: {
            "click #new-product-button": "add"
        },
        initialize: function () {
            _.bindAll(this, "render", "add");
            this.collection.bind("all", this.render);
        },

        render: function () {
            var table = $("#products-table");
            table.empty();
            this.collection.each(function (product) {
                var productEntry = new ProductEntry({ model: product });
                table.append(productEntry.render().el);
            });
            return this;
        },

        add: function () {
            $("#new-product-form-dialog").dialog("open");
        }
    });

    var ProductEntry = Backbone.View.extend({
        tagName: "tr",
        events: {
            "click .delete": "deleteProduct"
        },
        initialize: function () {
            _.bindAll(this, "render", "edit");
        },
        render: function () {
            $(this.el).append($("#product-item-template").tmpl(this.model.toJSON()));
            return this;
        },
        deleteProduct: function () {
            forms.confirmDialog("Are you sure you want to delete this Product? This cannot be undone.", function () {
                this.model.destroy();
            });
        }
    });
    */
    window.ProductsView = Backbone.View.extend({
        el: $("#products-table"),

        initialize: function () {
            this.model = new ProductStore();
            this.model.view = this;
            _.bindAll(this, "DataReady");
            this.render();
        },

        events: { "click #new-product-button": "AddProduct" },

        AddProduct: function () {
            var product = new Product();
            this.model.add(product);
            this.DisplayProduct(product);
        },

        DisplayProduct: function (product) {
            this.$('table').append(new ProductView({ model: product }).el);
        },

        DataReady: function (collection) {
            _.each(collection.models, this.DisplayProduct);
        },

        render: function () {
            this.model.fetch({ success: this.DataReady });
        }
    });

   window.ProductView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function () {
            this.model.view = this;
            //_.bindAll(this, "AddField", "refresh");
            this.render();
        },
        render: function () {
            //$(this.el).html(this.template(this.model));
            $(this.el).append($("#product-item-template").tmpl(this.model.toJSON()));
            return this;       
        }
    });
    new ProductsView();
});