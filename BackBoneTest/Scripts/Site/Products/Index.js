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
    url: "/List"
});

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

/*
        "hosts/:id": "productFor"

productFor: function (id) {
this.hostList = new DnsHostStore([], { zoneId: id });
var view = new DnsHostsList({ collection: this.hostList, el: $("#hosts") });
this.hostList.fetch();
}
*/

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
            list.append(productEntry.render().el);
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
