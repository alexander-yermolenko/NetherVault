import React from 'react';
import './rules.css'

function Rules() {
    return (
        <div className="rules-container">
            <h1>NetherVault Rules</h1>
            <h2>Welcome to NetherVault, the true realm of chaos and anarchy! While we pride ourselves on offering an unrestricted experience, there are a few minimal guidelines to ensure the server remains enjoyable for everyone.</h2>
            <ul>
                <li><b>No Personal Threats or Harassment</b>
                    <p>PvP, raiding, and destruction are encouraged, but real-life threats, hate speech, or harassment
                        are not. Keep the chaos in-game.</p><br/>
                </li>
                <li><b>No Server Crashing</b>
                    <p>Acts that intentionally harm server performance, such as lag machines or exploits designed to crash the server, will not be tolerated. Let the chaos stay fun!</p><br/>
                </li>
                <li><b>Respect the Anarchy Spirit</b>
                    <p>Betray alliances, steal, destroy, or conquer—it's all fair game! But remember, NetherVault thrives on the freedom of survival, not malicious intent outside the game.</p><br/>
                </li>
                <li><b>No Spamming or Advertising</b>
                    <p>Keep chat meaningful and free of spam or irrelevant advertisements. Let’s keep the focus on the game.</p><br/>
                </li>
                <li><b>Use Common Sense</b>
                    <p>While this is an anarchy server, actions that severely disrupt gameplay for others in an unintended way may result in consequences. When in doubt, ask yourself: “Does this ruin the experience for everyone?”</p><br/>
                </li>
            </ul>
        </div>
    );
}

export default Rules;
