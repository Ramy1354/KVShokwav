import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Servers.css';

const Servers = () => {
  const { user, userServers, selectServer, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="servers-loading">
        <div className="spinner-large"></div>
        <p>Loading your servers...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="servers-not-logged-in">
        <h2>Please log in to view your servers</h2>
        <p>You need to authenticate with Discord to manage your servers.</p>
      </div>
    );
  }

  const handleServerSelect = (server) => {
    selectServer(server);
    navigate('/dashboard');
  };

  return (
    <div className="servers-page">
      <div className="servers-header">
        <div className="user-profile">
          <img 
            src={user.avatar ? 
              `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128` : 
              'https://cdn.discordapp.com/embed/avatars/0.png'
            }
            alt={user.username}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{user.global_name || user.username}</h1>
            <p className="user-tag">@{user.username}#{user.discriminator}</p>
          </div>
        </div>

        <div className="servers-tabs">
          <button className="tab active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Servers
          </button>
          <button className="tab">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Premium
          </button>
          <button className="tab">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Settings
          </button>
        </div>
      </div>

      <div className="servers-content">
        <div className="servers-section">
          <h2>Servers</h2>
          <p className="servers-subtitle">Servers you're in ({userServers.length} servers)</p>
          
          <div className="servers-grid">
            {userServers.map(server => (
              <div 
                key={server.id} 
                className="server-card"
                onClick={() => handleServerSelect(server)}
              >
                <div className="server-icon">
                  {server.icon ? (
                    <img 
                      src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=64`}
                      alt={server.name}
                    />
                  ) : (
                    <div className="server-icon-placeholder">
                      {server.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="server-info">
                  <h3>{server.name}</h3>
                  <div className="server-badges">
                    {server.owner && (
                      <span className="badge owner">Owner</span>
                    )}
                    <span className="badge admin">Admin</span>
                  </div>
                </div>
                <div className="server-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {userServers.length === 0 && (
            <div className="no-servers">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <h3>No servers found</h3>
              <p>You don't have admin permissions in any servers, or the bot isn't added to your servers yet.</p>
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1465779916518723796&permissions=8&integration_type=0&scope=bot"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Invite Bot to Server
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servers;