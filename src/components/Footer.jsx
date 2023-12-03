import React from 'react';

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} Feel UX -{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/narayaurrutia/"
        >
          Nicolás Araya
        </a>
      </small>
    </footer>
  );
}

export default Footer;
