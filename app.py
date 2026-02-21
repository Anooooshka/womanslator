from flask import Flask, render_template, request, jsonify
from groq import Groq
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Set your API key from environment variable
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable not set")

os.environ["GROQ_API_KEY"] = api_key

# Create client
client = Groq()

# Store conversation history
messages = [
    {"role": "system", "content": """You are a ROMANTIC TRANSLATOR AI! When a woman gives you something her man/boyfriend said, 
    you translate it into the ROMANTIC, SWEET version of what he REALLY means deep down.
    Make it loving, affectionate, and romantic - what she actually wants to hear!
    Break down his casual/cold words and reveal the hidden love and care beneath.
    Keep your response SHORT and CONCISE - maximum 650 characters!
    Example: If he says "I'm gonna hang with my friends", you say: "Despite how it sounds, I do love and cherish you. I need some time with friends to recharge so I can be better for us. You're always in my heart 💕"
    Another example: "I'm busy" = "You're so important to me, and I want to give you my full attention. I'm handling some things right now, but when I'm done, I want to spend quality time with you because you mean the world to me 💞"
    Be romantic, loving, and show the affection behind his words. Use emojis and make her feel valued!"""}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/interpret', methods=['POST'])
def interpret():
    try:
        data = request.json
        user_input = data.get('message', '').strip()
        
        if not user_input:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Add user message
        messages.append({"role": "user", "content": f"My boyfriend said: '{user_input}'. What did he REALLY mean in a romantic way that shows he cares about me?"})
        
        # Get response from Groq
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=messages
        )
        
        bot_reply = response.choices[0].message.content
        
        # Enforce 650 character limit
        if len(bot_reply) > 650:
            bot_reply = bot_reply[:647] + "..."
        
        # Add bot response to memory
        messages.append({"role": "assistant", "content": bot_reply})
        
        return jsonify({'reply': bot_reply}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/clear', methods=['POST'])
def clear_history():
    global messages
    messages = [
        {"role": "system", "content": """You are a ROMANTIC TRANSLATOR AI! When a woman gives you something her man/boyfriend said, 
        you translate it into the ROMANTIC, SWEET version of what he REALLY means deep down.
        Make it loving, affectionate, and romantic - what she actually wants to hear!
        Break down his casual/cold words and reveal the hidden love and care beneath.
        Keep your response SHORT and CONCISE - maximum 650 characters!
        Example: If he says "I'm gonna hang with my friends", you say: "Despite how it sounds, I do love and cherish you. I need some time with friends to recharge so I can be better for us. You're always in my heart 💕"
        Another example: "I'm busy" = "You're so important to me, and I want to give you my full attention. I'm handling some things right now, but when I'm done, I want to spend quality time with you because you mean the world to me 💞"
        Be romantic, loving, and show the affection behind his words. Use emojis and make her feel valued!"""}
    ]
    return jsonify({'status': 'cleared'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

