import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { user, selectedServer, userServers, selectServer, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    prefix: '!',
    language: 'en',
    timezone: 'UTC',
    
    // Moderation
    welcomeChannel: '',
    logChannel: '',
    muteRole: '',
    autoMod: false,
    antiSpam: false,
    antiRaid: false,
    
    // Leveling
    levelingEnabled: true,
    levelUpChannel: '',
    levelUpMessage: 'Congratulations {user}! You reached level {level}!',
    
    // Economy
    economyEnabled: true,
    dailyAmount: 100,
    workAmount: 50,
    
    // Social Media
    twitchNotifications: false,
    twitchChannels: [],
    twitchNotificationChannel: '',
    youtubeNotifications: false,
    youtubeChannels: [],
    youtubeNotificationChannel: '',
    tiktokNotifications: false,
    tiktokChannels: [],
    tiktokNotificationChannel: '',
    
    // Auto Roles
    joinRole: '',
    boosterRole: '',
    
    // Reaction Roles
    reactionRoles: [],
    
    // Custom Commands
    customCommands: [],
    
    // Logging
    messageLog: false,
    messageLogChannel: '',
    memberLog: false,
    memberLogChannel: '',
    serverLog: false,
    serverLogChannel: '',
    moderationLog: false,
    moderationLogChannel: '',
    imageLog: false,
    imageLogChannel: '',
  });

  const categories = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'moderation', name: 'Moderation', icon: '🛡️' },
    { id: 'automod', name: 'Auto Moderation', icon: '🤖' },
    { id: 'leveling', name: 'Leveling', icon: '📊' },
    { id: 'economy', name: 'Economy', icon: '💰' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'autoroles', name: 'Auto Roles', icon: '👥' },
    { id: 'reactionroles', name: 'Reaction Roles', icon: '⭐' },
    { id: 'customcommands', name: 'Custom Commands', icon: '🔧' },
    { id: 'logging', name: 'Logging', icon: '📝' },
    { id: 'tickets', name: 'Tickets', icon: '🎫' },
    { id: 'ai', name: 'AI Features', icon: '🤖' },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleServerSelect = (server) => {
    selectServer(server);
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    alert(`Settings saved for ${selectedServer.name}!`);
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div className="settings-grid">
            <div className="setting-group card">
              <label className="setting-label">Command Prefix</label>
              <input
                type="text"
                className="setting-input"
                value={settings.prefix}
                onChange={(e) => handleInputChange('prefix', e.target.value)}
                placeholder="!"
              />
              <p className="setting-description">The prefix used before commands</p>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Language</label>
              <select
                className="setting-input"
                value={settings.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
              <p className="setting-description">Bot response language</p>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Timezone</label>
              <select
                className="setting-input"
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
              <p className="setting-description">Server timezone for scheduled events</p>
            </div>
          </div>
        );

      case 'moderation':
        return (
          <div className="settings-grid">
            <div className="setting-group card">
              <label className="setting-label">Welcome Channel</label>
              <input
                type="text"
                className="setting-input"
                value={settings.welcomeChannel}
                onChange={(e) => handleInputChange('welcomeChannel', e.target.value)}
                placeholder="#welcome"
              />
              <p className="setting-description">Channel for welcome messages</p>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Log Channel</label>
              <input
                type="text"
                className="setting-input"
                value={settings.logChannel}
                onChange={(e) => handleInputChange('logChannel', e.target.value)}
                placeholder="#logs"
              />
              <p className="setting-description">Channel for moderation logs</p>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Mute Role</label>
              <input
                type="text"
                className="setting-input"
                value={settings.muteRole}
                onChange={(e) => handleInputChange('muteRole', e.target.value)}
                placeholder="@Muted"
              />
              <p className="setting-description">Role given to muted users</p>
            </div>
          </div>
        );

      case 'automod':
        return (
          <div className="settings-grid">
            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Anti-Spam Protection</label>
                  <p className="setting-description">Automatically detect and prevent spam</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.antiSpam}
                    onChange={() => handleToggle('antiSpam')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Auto Moderation</label>
                  <p className="setting-description">Automatically moderate inappropriate content</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoMod}
                    onChange={() => handleToggle('autoMod')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Anti-Raid Protection</label>
                  <p className="setting-description">Protect against server raids</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.antiRaid}
                    onChange={() => handleToggle('antiRaid')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'leveling':
        return (
          <div className="settings-grid">
            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Enable Leveling System</label>
                  <p className="setting-description">Allow users to gain XP and levels</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.levelingEnabled}
                    onChange={() => handleToggle('levelingEnabled')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Level Up Channel</label>
              <input
                type="text"
                className="setting-input"
                value={settings.levelUpChannel}
                onChange={(e) => handleInputChange('levelUpChannel', e.target.value)}
                placeholder="#general"
              />
              <p className="setting-description">Channel for level up announcements</p>
            </div>

            <div className="setting-group card full-width">
              <label className="setting-label">Level Up Message</label>
              <textarea
                className="setting-textarea"
                value={settings.levelUpMessage}
                onChange={(e) => handleInputChange('levelUpMessage', e.target.value)}
                placeholder="Congratulations {user}! You reached level {level}!"
                rows="3"
              />
              <p className="setting-description">Use {'{user}'} for username and {'{level}'} for level</p>
            </div>
          </div>
        );

      case 'economy':
        return (
          <div className="settings-grid">
            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Enable Economy</label>
                  <p className="setting-description">Allow users to earn and spend virtual currency</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.economyEnabled}
                    onChange={() => handleToggle('economyEnabled')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Daily Reward Amount</label>
              <input
                type="number"
                className="setting-input"
                value={settings.dailyAmount}
                onChange={(e) => handleInputChange('dailyAmount', parseInt(e.target.value))}
                min="1"
                max="1000"
              />
              <p className="setting-description">Amount users receive from daily command</p>
            </div>

            <div className="setting-group card">
              <label className="setting-label">Work Reward Amount</label>
              <input
                type="number"
                className="setting-input"
                value={settings.workAmount}
                onChange={(e) => handleInputChange('workAmount', parseInt(e.target.value))}
                min="1"
                max="500"
              />
              <p className="setting-description">Amount users receive from work command</p>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="settings-grid">
            {/* Twitch Section */}
            <div className="setting-group card toggle-card full-width">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">🟣 Twitch Notifications</label>
                  <p className="setting-description">Get notified when streamers go live</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.twitchNotifications}
                    onChange={() => handleToggle('twitchNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              {settings.twitchNotifications && (
                <div className="social-config">
                  <div className="social-input-group">
                    <label className="setting-label">Notification Channel</label>
                    <input
                      type="text"
                      className="setting-input"
                      value={settings.twitchNotificationChannel}
                      onChange={(e) => handleInputChange('twitchNotificationChannel', e.target.value)}
                      placeholder="#twitch-notifications"
                    />
                    <p className="setting-description">Channel where Twitch notifications will be sent</p>
                  </div>
                  
                  <div className="social-input-group">
                    <label className="setting-label">Twitch Streamers</label>
                    <input
                      type="text"
                      className="setting-input"
                      placeholder="Enter Twitch username (e.g., ninja, pokimane)"
                    />
                    <button className="btn-secondary add-creator-btn">+ Add Streamer</button>
                    <p className="setting-description">Add Twitch usernames to monitor for live streams</p>
                  </div>
                  
                  <div className="creator-list">
                    <div className="creator-item">
                      <span className="creator-name">ninja</span>
                      <button className="remove-creator">×</button>
                    </div>
                    <div className="creator-item">
                      <span className="creator-name">pokimane</span>
                      <button className="remove-creator">×</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* YouTube Section */}
            <div className="setting-group card toggle-card full-width">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">🔴 YouTube Notifications</label>
                  <p className="setting-description">Get notified about new videos</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.youtubeNotifications}
                    onChange={() => handleToggle('youtubeNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              {settings.youtubeNotifications && (
                <div className="social-config">
                  <div className="social-input-group">
                    <label className="setting-label">Notification Channel</label>
                    <input
                      type="text"
                      className="setting-input"
                      value={settings.youtubeNotificationChannel}
                      onChange={(e) => handleInputChange('youtubeNotificationChannel', e.target.value)}
                      placeholder="#youtube-notifications"
                    />
                    <p className="setting-description">Channel where YouTube notifications will be sent</p>
                  </div>
                  
                  <div className="social-input-group">
                    <label className="setting-label">YouTube Channels</label>
                    <input
                      type="text"
                      className="setting-input"
                      placeholder="Enter YouTube channel URL or @username"
                    />
                    <button className="btn-secondary add-creator-btn">+ Add Channel</button>
                    <p className="setting-description">Add YouTube channel URLs or @usernames to monitor</p>
                  </div>
                  
                  <div className="creator-list">
                    <div className="creator-item">
                      <span className="creator-name">@MrBeast</span>
                      <button className="remove-creator">×</button>
                    </div>
                    <div className="creator-item">
                      <span className="creator-name">@PewDiePie</span>
                      <button className="remove-creator">×</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* TikTok Section */}
            <div className="setting-group card toggle-card full-width">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">⚫ TikTok Notifications</label>
                  <p className="setting-description">Get notified about new TikTok posts</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.tiktokNotifications}
                    onChange={() => handleToggle('tiktokNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              {settings.tiktokNotifications && (
                <div className="social-config">
                  <div className="social-input-group">
                    <label className="setting-label">Notification Channel</label>
                    <input
                      type="text"
                      className="setting-input"
                      value={settings.tiktokNotificationChannel}
                      onChange={(e) => handleInputChange('tiktokNotificationChannel', e.target.value)}
                      placeholder="#tiktok-notifications"
                    />
                    <p className="setting-description">Channel where TikTok notifications will be sent</p>
                  </div>
                  
                  <div className="social-input-group">
                    <label className="setting-label">TikTok Creators</label>
                    <input
                      type="text"
                      className="setting-input"
                      placeholder="Enter TikTok username (e.g., @charlidamelio)"
                    />
                    <button className="btn-secondary add-creator-btn">+ Add Creator</button>
                    <p className="setting-description">Add TikTok usernames to monitor for new posts</p>
                  </div>
                  
                  <div className="creator-list">
                    <div className="creator-item">
                      <span className="creator-name">@charlidamelio</span>
                      <button className="remove-creator">×</button>
                    </div>
                    <div className="creator-item">
                      <span className="creator-name">@khaby.lame</span>
                      <button className="remove-creator">×</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'logging':
        return (
          <div className="settings-grid">
            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Message Logging</label>
                  <p className="setting-description">Log message edits and deletions</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.messageLog}
                    onChange={() => handleToggle('messageLog')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {settings.messageLog && (
                <div className="channel-input">
                  <label className="setting-label">Message Log Channel</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.messageLogChannel}
                    onChange={(e) => handleInputChange('messageLogChannel', e.target.value)}
                    placeholder="#message-logs"
                  />
                  <p className="setting-description">Channel where message logs will be sent</p>
                </div>
              )}
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Member Logging</label>
                  <p className="setting-description">Log member joins and leaves</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.memberLog}
                    onChange={() => handleToggle('memberLog')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {settings.memberLog && (
                <div className="channel-input">
                  <label className="setting-label">Member Log Channel</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.memberLogChannel}
                    onChange={(e) => handleInputChange('memberLogChannel', e.target.value)}
                    placeholder="#member-logs"
                  />
                  <p className="setting-description">Channel where member logs will be sent</p>
                </div>
              )}
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Server Logging</label>
                  <p className="setting-description">Log server changes and updates</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.serverLog}
                    onChange={() => handleToggle('serverLog')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {settings.serverLog && (
                <div className="channel-input">
                  <label className="setting-label">Server Log Channel</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.serverLogChannel}
                    onChange={(e) => handleInputChange('serverLogChannel', e.target.value)}
                    placeholder="#server-logs"
                  />
                  <p className="setting-description">Channel where server logs will be sent</p>
                </div>
              )}
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Moderation Logging</label>
                  <p className="setting-description">Log moderation actions</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.moderationLog}
                    onChange={() => handleToggle('moderationLog')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {settings.moderationLog && (
                <div className="channel-input">
                  <label className="setting-label">Moderation Log Channel</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.moderationLogChannel}
                    onChange={(e) => handleInputChange('moderationLogChannel', e.target.value)}
                    placeholder="#mod-logs"
                  />
                  <p className="setting-description">Channel where moderation logs will be sent</p>
                </div>
              )}
            </div>

            <div className="setting-group card toggle-card">
              <div className="toggle-setting">
                <div>
                  <label className="setting-label">Image Logging</label>
                  <p className="setting-description">Log image uploads, edits, and deletions</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.imageLog}
                    onChange={() => handleToggle('imageLog')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {settings.imageLog && (
                <div className="channel-input">
                  <label className="setting-label">Image Log Channel</label>
                  <input
                    type="text"
                    className="setting-input"
                    value={settings.imageLogChannel}
                    onChange={(e) => handleInputChange('imageLogChannel', e.target.value)}
                    placeholder="#image-logs"
                  />
                  <p className="setting-description">Channel where image logs will be sent</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="coming-soon">
            <div className="coming-soon-icon">🚧</div>
            <h3>Coming Soon</h3>
            <p>This feature is currently under development.</p>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="dashboard-not-logged-in">
        <h2>Please log in to access the dashboard</h2>
        <p>You need to authenticate with Discord to manage your servers.</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title gradient-text">Server Dashboard</h1>
        <p className="dashboard-subtitle">Configure your server settings</p>

        <div className="dashboard-content">
          <div className="server-list">
            <h2 className="section-heading">Your Servers</h2>
            <div className="servers">
              {userServers.map(server => (
                <button
                  key={server.id}
                  className={`server-item ${selectedServer?.id === server.id ? 'active' : ''}`}
                  onClick={() => handleServerSelect(server)}
                >
                  <div className="server-icon-small">
                    {server.icon ? (
                      <img 
                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png?size=32`}
                        alt={server.name}
                      />
                    ) : (
                      <span>{server.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="server-name">{server.name}</span>
                  {server.owner && <span className="owner-badge">👑</span>}
                </button>
              ))}
              
              {userServers.length === 0 && (
                <div className="no-servers-dashboard">
                  <p>No servers found</p>
                  <button 
                    className="btn-secondary"
                    onClick={() => navigate('/servers')}
                  >
                    View All Servers
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="settings-panel">
            {selectedServer ? (
              <>
                <div className="settings-header">
                  <div className="server-header-info">
                    <div className="server-icon-large">
                      {selectedServer.icon ? (
                        <img 
                          src={`https://cdn.discordapp.com/icons/${selectedServer.id}/${selectedServer.icon}.png?size=64`}
                          alt={selectedServer.name}
                        />
                      ) : (
                        <span>{selectedServer.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="section-heading">{selectedServer.name}</h2>
                      <p className="server-id">ID: {selectedServer.id}</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-layout">
                  <div className="category-sidebar">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-name">{category.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="category-content">
                    <div className="category-header">
                      <h3>{categories.find(c => c.id === activeCategory)?.name}</h3>
                    </div>
                    
                    {renderCategoryContent()}

                    <div className="dashboard-actions">
                      <button className="btn-primary save-btn" onClick={handleSave}>
                        💾 Save Settings
                      </button>
                      <button className="btn-secondary">
                        🔄 Reset to Default
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-server-selected">
                <div className="no-server-icon">⚙️</div>
                <h3>Select a Server</h3>
                <p>Choose a server from the list to configure its settings</p>
                <button 
                  className="btn-primary"
                  onClick={() => navigate('/servers')}
                >
                  View All Servers
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;