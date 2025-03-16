function Footer() {
    const footerYear = new Date().getFullYear()
  
    return (
      <footer className='footer p-5 bg-gray-700 bg-secondary footer-center'>
        <div>
          <p>Copyright &copy; {footerYear} All rights reserved</p>
        </div>
      </footer>
    )
  }
  
  export default Footer
