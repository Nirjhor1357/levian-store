import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 px-4 border-t border-gray-100 mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4">About Levián</h3>
            <p className="text-gray-600 mb-4">
              Levián is a premium clothing brand focused on creating timeless, high-quality garments that blend comfort with sophisticated style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary">
                <i className="ri-facebook-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary">
                <i className="ri-pinterest-line"></i>
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary">
                <i className="ri-twitter-x-line"></i>
              </a>
            </div>
          </div>
          {/* Shop */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">New Arrivals</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Women</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Men</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Collections</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Sale</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Lookbook</a></li>
            </ul>
          </div>
          {/* Help */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Customer Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">My Account</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Find a Store</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-primary mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; 2025 Levián. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-6 flex items-center justify-center">
                <i className="ri-visa-fill ri-lg"></i>
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <i className="ri-mastercard-fill ri-lg"></i>
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <i className="ri-paypal-fill ri-lg"></i>
              </div>
              <div className="w-10 h-6 flex items-center justify-center">
                <i className="ri-apple-fill ri-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
