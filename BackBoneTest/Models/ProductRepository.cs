using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BackBoneTest.Models
{
    public class ProductRepository
    {
        private static List<Product> Products = new List<Product>();

        static ProductRepository()
        {
            Products.Add(new Product { Description = "Food", Name = "Nutella", Price = 4, Id = 1});
            Products.Add(new Product { Description = "Food", Name = "Peanut Butter", Price = 2, Id = 2});
            Products.Add(new Product { Description = "Food", Name = "Baguet", Price = 3, Id = 3});
            Products.Add(new Product { Description = "Food", Name = "LingonBerry Jam", Price = 5, Id = 4});
            Products.Add(new Product { Description = "Kitchen", Name = "Knife", Price = 10, Id = 5});
        }

        public IEnumerable<Product> GetProducts()
        {
            return Products;
        }

        public bool AddProduct(Product product)
        {
            if (Products.Any(x => x.Id == product.Id))
                throw new Exception("Id already exists");

            if (Products.Any(x => x.Name.ToLower() == product.Name.ToLower()))
                throw new Exception("product with this name already exists");

            Products.Add(product);

            return true;
        }

        public bool UpdateProduct (Product product)
        {
            var currentProduct = Products.Where(x => x.Id == product.Id).FirstOrDefault();
            if (currentProduct == null)
                throw new Exception("product does not exists!!");
            currentProduct.Description = product.Description;
            currentProduct.Price = product.Price;
            return true;
        }

        public bool DeleteProduct(int productId)
        {
            var currentProduct = Products.Where(x => x.Id == productId).FirstOrDefault();
            if (currentProduct == null)
                throw new Exception("product does not exists!!");

            Products.Remove(currentProduct);
            return true;
        }
    }
}