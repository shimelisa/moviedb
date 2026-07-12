import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, ChevronDown } from "lucide-react";

import styles from "./Header.module.css";
import logo from "../../assets/image/logo.png";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // for blur
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the profile dropdown when clicking outside of it.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus the search input once it appears.
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Netflix logo" />
        </Link>

        {/* Navigation link */}
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="/">
            Home
          </Link>
          <Link className={styles.navLink} to="/my-list">
            My List
          </Link>
          <Link className={styles.navLink} to="/search">
            Search
          </Link>
        </nav>

        {/* Right side section */}
        <div className={styles.rightSection}>
          {/* Search */}
          <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
            <button
              type="button"
              onClick={handleSearchToggle}
              className={styles.searchButton}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
            {isSearchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="movie title"
                className={styles.searchInput}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => {
                  if (!query) setIsSearchOpen(false);
                }}
              />
            )}
          </form>

          {/* Notification */}
          <button className={styles.iconButton} aria-label="Notifications">
            <Bell size={20} />
            <span className={styles.notificationBadge}>4</span>
          </button>

          {/* Profile */}
          <div className={styles.profileContainer} ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className={styles.profileButton}
            >
              {/* user icon */}
              <div className={styles.profileAvatar}>
                <User size={20} />
              </div>
              {/* dropdown icon */}
              <ChevronDown size={20} />
            </button>
            {isProfileOpen && (
              <div className={styles.profileMenu}>
                <Link className={styles.profileMenuItem} to="/my-list">
                  My List
                </Link>
                <a
                  className={styles.profileMenuItem}
                  href="https://help.netflix.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Help Center
                </a>
                <hr className={styles.profileMenuDivider} />
                <button
                  className={styles.profileMenuItem}
                  onClick={() => alert("Sign out is a demo action in this clone.")}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
