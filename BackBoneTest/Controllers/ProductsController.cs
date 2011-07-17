using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BackBoneTest.Models;

namespace BackBoneTest.Controllers
{
    public class ProductsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult List()
        {
            var repo = new ProductRepository();
            return Json(repo.GetProducts(), JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var repo = new ProductRepository();
            repo.DeleteProduct(id);

            return Json(new { id });
        }

        [HttpPost]
        public ActionResult Create(Product postData)
        {
            var repo = new ProductRepository();
            repo.AddProduct(postData);
            return Json(new { id = postData.Id });
        }

    }
}
