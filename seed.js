<!DOCTYPE html>  
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHYSICA - Department of Physics Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js" type="module"></script>
    
    <script src="https://cdn.socket.io/4.7.4/socket.io.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    
    <style>
        body { transition: background 0.5s ease, color 0.5s ease; }
        .card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease; }
        
        body.light-theme {
            --primary: #0066cc;
            --primary-dark: #004499;
            --primary-glow: rgba(0, 102, 204, 0.15);
            --accent: #0284c7;
            --bg-deep: #f8fafc;
            --bg-space: #ffffff;
            --surface: #ffffff; 
            --surface-elevated: #f8fafc;
            --text-main: #0f172a; /* Dark text for readability */
            --text-dim: #334155;
            --text-tertiary: #64748b;
            --border: rgba(85, 93, 117, 0.25); /* Softened border */
            --border-hover: rgba(0, 102, 204, 0.3);
            --shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            --shadow-glow: 0 10px 25px rgba(0, 102, 204, 0.15);
            background-color: var(--bg-deep);
            position: relative;
        }
      body.light-theme::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url("https://raw.githubusercontent.com/shibom-lang/projects/main/doodle.png");
    background-repeat: repeat;
    background-size: 300px;

    opacity: 0.36;
filter: grayscale(100%) contrast(0.9) brightness(1.2);

    z-index: -1;
    pointer-events: none;
}
        body.light-theme .space-bg { display: none !important; }

        body.light-theme header {
            background: var(--primary-dark) !important;
            border-bottom: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        
        body.light-theme .logo,
        body.light-theme .logo span,
        body.light-theme .college-name-en,
        body.light-theme .college-name-as {
            color: #ffffff !important;
            text-shadow: none !important;
        }

        body.light-theme .nav-link {
            color: rgba(255,255,255,0.85) !important;
        }
        body.light-theme .nav-link:hover, 
        body.light-theme .nav-link.active {
            color: #FFD700 !important; 
        }

        body.light-theme .traffic-text,
        body.light-theme #live-ticker-text,
        body.light-theme .clock-text,
        body.light-theme .clock-time {
            color: #ffffff !important;
        }

        body.light-theme .card { box-shadow: var(--shadow); background: var(--surface) !important; }
        body.light-theme input, body.light-theme select, body.light-theme textarea {
            background: #ffffff !important;
            color: var(--text-main) !important;
            border: 1px solid #cbd5e1 !important;
        }


        body.light-theme main [style*="color: white"],
        body.light-theme main [style*="color: #fff"],
        body.light-theme main [style*="color: #ffffff"] {
            color: var(--text-main) !important;
        }
        
        body.light-theme main h1,
        body.light-theme main h2,
        body.light-theme main h3:not(.swiper-slide h3), 
        body.light-theme main h4,
        body.light-theme main h5,
        body.light-theme main h6 {
            color: var(--text-main) !important;
        }

        body.light-theme .hero h1 {
            background: none !important;
            -webkit-text-fill-color: var(--text-main) !important;
            color: var(--text-main) !important;
            text-shadow: none !important;
        }
        /* === PROFESSIONAL THEME === */
        :root {
            --primary: #0088ff;
            --primary-dark: #0055ff;
            --primary-glow: rgba(0, 136, 255, 0.4);
            --secondary: #475569;
            --accent: #0ea5e9;
            --accent-glow: rgba(14, 165, 233, 0.4);
            --success: #10b981;
            --warning: #f59e0b;
            --tartiary: #FFD700;
            --error: #ef4444;
            --bg-deep: #050810; 
            --bg-space: #0a0e1a;
            --surface: rgba(255, 255, 255, 0.03);
            --surface-elevated: rgba(255, 255, 255, 0.06);
            --text-main: #f8fafc;
            --text-dim: #cbd5e1;
            --text-tertiary: #94a3b8;
            --border: rgba(148, 163, 184, 0.15);
            --border-hover: rgba(0, 136, 255, 0.3);
            --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            --shadow-glow: 0 8px 30px -5px var(--primary-glow), 0 0 15px rgba(0, 136, 255, 0.1);
        }

        * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0; 
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-deep);
            color: var(--text-main);
            line-height: 1.65;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        /* === UNIFIED SUSTAINABLE HEADER === */
        header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: #0a0e1a; 
            backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(0, 136, 255, 0.3);
            padding: 10px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .college-branding {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .college-logo {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
            transition: transform 0.3s ease;
        }

        .college-names p {
            margin: 0;
            line-height: 1.2;
        }

        .college-name-en {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: 0.02em;
        }

        .college-name-as {
            font-size: 0.9rem;
            color: var(--text-dim);
            font-weight: 500;
        }

        .dept-logo-area {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .physica-logo {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 8px;
            text-shadow: 0 0 15px var(--primary-glow);
        }
          
        /* === ADVANCED SPACE BACKGROUND === */
        .space-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none; 
        }

        /* Nebula with original colors but subtle opacity */
        .nebula {
            position: absolute;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, rgba(0, 217, 255, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(255, 0, 110, 0.06) 0%, transparent 60%);
            animation: nebulaDrift 35s ease-in-out infinite;
        }

        @keyframes nebulaDrift {
            0%,100% {
                opacity:0.7;
                transform: scale(1) translateX(0) translateY(0);
            }
            50% {
                opacity:1;
                transform: scale(1.08) translateX(40px) translateY(-20px);
            }
        }

        /* Stars */
        .stars {
            position: absolute;
            width: 100%;
            height: 100%;
        
            background-image:
                radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.9), transparent),
                radial-gradient(1px 1px at 25% 60%, rgba(255,255,255,0.8), transparent),
                radial-gradient(2px 2px at 50% 40%, rgba(255,255,255,0.7), transparent),
                radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.9), transparent),
                radial-gradient(2px 2px at 85% 15%, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,0.7), transparent);
        
            background-size:
                120px 120px,
                210px 210px,
                340px 340px,
                480px 480px,
                260px 260px,
                390px 390px;
        
            animation: starsMove 160s linear infinite;
        }

        .stars-2 {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(1px 1px at 40% 20%, rgba(255, 255, 255, 0.6), transparent),
                radial-gradient(1px 1px at 70% 50%, rgba(255, 255, 255, 0.5), transparent),
                radial-gradient(2px 2px at 10% 60%, rgba(14, 165, 233, 0.6), transparent);
            background-size: 250px 250px, 180px 180px, 300px 300px;
            animation: starsMove 80s linear infinite reverse;
        }

        /* Shooting Stars */
        .shooting-star {
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg,
                rgba(255,255,255,0),
                rgba(255,255,255,0.9),
                rgba(255,255,255,0)
            );
            opacity:0;
            filter: drop-shadow(0 0 6px rgba(255,255,255,0.8));
        }
        
        .shooting-star:nth-child(1){
            top:12%;
            width:120px;
            animation: shoot 4s linear infinite;
            animation-delay:1s;
        }
        
        .shooting-star:nth-child(2){
            top:38%;
            width:140px;
            animation: shoot 5.8s linear infinite;
            animation-delay:3s;
        }
        
        .shooting-star:nth-child(3){
            top:63%;
            width:90px;
            animation: shoot 6.7s linear infinite;
            animation-delay:2s;
        }
        
        .shooting-star:nth-child(4){
            top:80%;
            width:160px;
            animation: shoot 7.2s linear infinite;
            animation-delay:4s;
        }

        @keyframes shoot {
            0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(1000px) translateY(500px) rotate(-45deg); opacity: 0; }
        }

        @keyframes starsMove {
            from { transform: translateY(0); }
            to { transform: translateY(-100px); }
        }

        /* Particles */
        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        .particle{
            position:absolute;
            background:rgba(255,255,255,0.6);
            border-radius:50%;
            box-shadow:0 0 6px rgba(255,255,255,0.6);
            animation:float 12s infinite ease-in-out;
        }

        .particle:nth-child(1) { width: 3px; height: 3px; left: 10%; top: 20%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 2px; height: 2px; left: 25%; top: 60%; animation-delay: 1s; }
        .particle:nth-child(3) { width: 4px; height: 4px; left: 50%; top: 40%; animation-delay: 2s; }
        .particle:nth-child(4) { width: 2px; height: 2px; left: 75%; top: 70%; animation-delay: 3s; }

        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
            50% { transform: translateY(-30px) translateX(20px); opacity: 1; }
        }

        /* === TYPOGRAPHY === */
        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            letter-spacing: -0.025em;
            line-height: 1.2;
        }

        h1 { font-size: 2.5rem; }
        h2 { font-size: 2rem; }
        h3 { font-size: 1.5rem; }
        h4 { font-size: 1.25rem; }

        .mono {
            font-family: 'IBM Plex Mono', monospace;
        }

        /* === LAYOUT === */
        .container { 
            max-width: 1280px; 
            margin: 0 auto; 
            padding: 0 2rem; 
        }

        .grid { display: grid; gap: 1.5rem; }
        .grid-2 { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
        .hidden { display: none !important; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .items-center { align-items: center; }
        .mt-4 { margin-top: 1rem; }
        .mb-4 { margin-bottom: 1rem; }
        .text-center { text-align: center; }
        .text-sm { font-size: 0.875rem; }
        .font-bold { font-weight: 700; }

        /* === HEADER === */
        body:not(.light-theme) header {
            background: rgba(10, 14, 26, 0.7);
            backdrop-filter: blur(16px) saturate(180%);
            border-bottom: 1px solid var(--border);
            padding: 1rem 0;
            position: sticky; 
            top: 0; 
            z-index: 100;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .logo { 
            font-size: 1.35rem; 
            font-weight: 800; 
            color: var(--text-main); 
            display: flex; 
            align-items: center; 
            gap: 0.75rem;
            transition: all 0.3s ease;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        }

        .logo:hover {
            text-shadow: 0 0 15px var(--primary-glow);
            transform: scale(1.02);
        }

        .animated-lottie-logo {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            filter: drop-shadow(0 0 8px rgba(0, 136, 255, 0.6));
        }

        .nav-link { 
            color: var(--text-dim); 
            margin-left: 2rem; 
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
            padding: 0.5rem 0;
            transition: all 0.2s ease;
            cursor: pointer;
        }

        .nav-link:hover, .nav-link.active { 
            color: var(--text-main); 
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
        }

        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary);
            box-shadow: 0 0 8px var(--primary);
        }

        /* === PROFESSIONAL CARDS (WITH SLIGHT GLOW) === */
        .card {
            background: var(--surface);
            backdrop-filter: blur(20px);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            z-index: 2;
        }

        .card:hover {
            background: var(--surface-elevated);
            border-color: var(--border-hover);
            box-shadow: var(--shadow-glow);
            transform: translateY(-4px);
        }

        .card-header { 
            padding-bottom: 1rem; 
            border-bottom: 1px solid var(--border); 
            font-weight: 600; 
            font-size: 1.1rem;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .card-body { 
            padding-top: 1rem; 
            color: var(--text-dim);
        }

        /* === INPUTS & BUTTONS === */
        label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-dim);
            margin-bottom: 0.5rem;
        }

        input, select, textarea {
            width: 100%; 
            padding: 0.75rem 1rem; 
            margin-bottom: 1rem;
            background: rgba(0, 0, 0, 0.2); 
            border: 1px solid var(--border);
            border-radius: 8px; 
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        input:focus, select:focus, textarea:focus { 
            outline: none; 
            border-color: var(--primary); 
            background: rgba(0, 0, 0, 0.4);
            box-shadow: 0 0 12px rgba(0, 136, 255, 0.2);
        }

        .btn { 
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem; 
            border-radius: 8px; 
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer; 
            border: none; 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
        }

        .btn-primary { 
            background: linear-gradient(135deg, var(--primary), var(--accent)); 
            color: white;
            box-shadow: 0 4px 12px rgba(0, 136, 255, 0.2);
        }

        .btn-primary:hover:not(:disabled) { 
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--primary-glow);
        }

        .btn-outline { 
            background: transparent; 
            border: 1px solid var(--border); 
            color: var(--text-main);
        }

        .btn-outline:hover {
            background: var(--surface-elevated);
            border-color: var(--primary);
            box-shadow: 0 0 10px rgba(0, 136, 255, 0.15);
        }

        .btn-success { 
            background: linear-gradient(135deg, var(--success), #059669); 
            color: white; 
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        
        .btn-success:hover {
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
            transform: translateY(-2px);
        }

        .btn-sm { 
            padding: 0.5rem 1rem; 
            font-size: 0.875rem; 
        }

        /* === DASHBOARD === */
        .dashboard-layout { 
            display: flex; 
            gap: 2rem; 
            min-height: 80vh; 
            padding-top: 2rem; 
        }

        .sidebar { 
            width: 280px; 
            flex-shrink: 0; 
        }

        .menu-item { 
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.875rem 1rem; 
            border-radius: 8px; 
            cursor: pointer; 
            color: var(--text-dim); 
            margin-bottom: 0.5rem;
            transition: all 0.2s ease;
            font-weight: 500;
            font-size: 0.95rem;
        }

        .menu-item:hover { 
            background: var(--surface); 
            color: var(--text-main);
            transform: translateX(4px);
        }

        .menu-item.active { 
            background: rgba(0, 136, 255, 0.15);
            color: var(--primary); 
            border: 1px solid rgba(0, 136, 255, 0.3);
            box-shadow: 0 0 10px rgba(0, 136, 255, 0.1);
        }

        .content-area { 
            flex-grow: 1; 
        }

        /* === TABLE === */
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 1rem; 
        }

        th, td { 
            padding: 0.875rem 1rem; 
            text-align: left; 
            border-bottom: 1px solid var(--border); 
        }

        th {
            font-weight: 600;
            font-size: 0.875rem;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        tr {
            transition: background 0.2s ease;
        }

        tr:hover {
            background: var(--surface);
        }

        /* === FACULTY CARDS === */
        .faculty-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .faculty-card {
            text-align: center;
            padding: 2rem 1.5rem;
        }

        .faculty-avatar {
            width: 96px;
            height: 96px;
            margin: 0 auto 1.5rem;
            background: linear-gradient(135deg, rgba(0, 136, 255, 0.15), rgba(14, 165, 233, 0.15));
            border: 2px solid var(--border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            transition: all 0.4s ease;
        }

        .faculty-card:hover .faculty-avatar {
            transform: scale(1.1) rotate(5deg);
            border-color: var(--primary);
            box-shadow: 0 0 20px rgba(0, 136, 255, 0.3);
        }

        /* === HERO SECTION === */
        .hero {
            text-align: center;
            padding: 5rem 0 3rem;
            position: relative;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
            line-height: 1.1;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        .hero p {
            font-size: 1.25rem;
            color: var(--text-dim);
            max-width: 700px;
            margin: 0 auto 2rem;
            font-weight: 400;
        }

        /* === STATS === */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .stat-card {
            text-align: center;
            padding: 1.5rem;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
            line-height: 1;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 15px rgba(0, 136, 255, 0.3);
        }

        .stat-label {
            font-size: 0.875rem;
            color: var(--text-tertiary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        /* === MAGAZINE STYLES === */
        .mag-cover {
            width: 100%; 
            height: 220px; 
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(0, 217, 255, 0.1) 100%);
            border-radius: 8px;
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 3.5rem;
            margin-bottom: 1.5rem; 
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
        }

        .mag-cover:hover {
            border-color: var(--primary);
            box-shadow: 0 10px 30px rgba(0, 136, 255, 0.2);
            transform: scale(1.02);
        }

        /* === 👩‍🚀 MASCOT === */
        .astronaut-container { 
            position: fixed; 
            bottom: 2rem; 
            right: 2rem; 
            z-index: 1000; 
            display: flex; 
            flex-direction: column; 
            align-items: flex-end; 
        }
        
        .astronaut-img { 
            width: 90px; 
            height: auto; 
            filter: drop-shadow(0 0 10px rgba(0, 136, 255, 0.4)); 
            transition: transform 0.3s ease; 
            cursor: pointer; 
            animation: floatSubtle 6s ease-in-out infinite; 
            opacity: 0.95;
        }
        
        .astronaut-img:hover { 
            transform: scale(1.1) rotate(5deg);
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(0, 136, 255, 0.6));
        }

        @keyframes floatSubtle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        .mascot-bubble { 
            background: rgba(255, 255, 255, 0.98); 
            color: #0f172a; 
            padding: 0.875rem 1rem; 
            border-radius: 12px; 
            width: 240px; 
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 0.75rem; 
            opacity: 0; 
            visibility: hidden; 
            transition: all 0.3s ease;
            border: 1px solid var(--border);
        }
        
        .mascot-bubble.show { 
            opacity: 1; 
            visibility: visible; 
        }
        
        /* === RESPONSIVE FIXES === */
       /* === RESPONSIVE FIXES === */
       @media (max-width: 768px) { 
        /* === UNIFIED HEADER MOBILE FIX === */
        header .header-container { 
            flex-direction: column !important; 
            text-align: center !important; 
            gap: 1rem; 
            padding-bottom: 0.5rem; 
        }

        .college-branding {
            flex-direction: column;
            gap: 8px !important;
        }

        .college-names {
            text-align: center !important;
        }

        .dept-nav-area {
            align-items: center !important;
            width: 100%;
        }

        nav ul { 
            flex-wrap: wrap; 
            justify-content: center; 
            gap: 8px; 
            padding: 0; 
            margin-top: 10px;
        }

        .nav-link { 
            margin-left: 0; 
            margin: 0 4px; 
            font-size: 0.8rem; 
            padding: 0.3rem 0; 
        }
        
        /* === LAYOUT & CONTENT FIXES === */
        .container { width: 100%; padding: 0 1rem; overflow-x: hidden; }
        .dashboard-layout { flex-direction: column; gap: 1rem; } 
        .sidebar { width: 100%; }
        .grid-2 { grid-template-columns: 1fr; }
        .card { padding: 1.25rem; } 
        
        .hero { padding: 3rem 0 1.5rem; }
        .hero h1 { font-size: 2rem; word-wrap: break-word; line-height: 1.2; }
        .hero p { font-size: 1rem; padding: 0 10px; }
        
        .heroSwiper { 
            height: 250px !important; 
            border-radius: 10px !important;
            margin-top: 0 !important;
        }

        .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .stat-value { font-size: 1.8rem; }
        
        .astronaut-container { bottom: 15px; right: 15px; }
        .astronaut-img { width: 60px; }
        .mascot-bubble { width: 160px; right: 0; font-size: 0.8rem; padding: 0.6rem; }
    }
        /* === CUSTOM SCROLLBAR === */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--bg-space); }
        ::-webkit-scrollbar-thumb { background: var(--secondary); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
    </style>
</head>

<body>
  
    <div class="space-bg">
        <div class="nebula"></div>
        <div class="stars"></div>
        <div class="stars-2"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>

        <div class="particles">
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
            <div class="particle"></div>
           <div class="particle"></div>
           <div class="particle"></div>
        </div>
    </div>
<div style="background: rgba(0, 10, 30, 0.8); border-bottom: 1px solid rgba(0, 136, 255, 0.2); padding: 0.4rem 5%; display: flex; justify-content: space-between; align-items: center; font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; backdrop-filter: blur(10px); position: relative; z-index: 1000;">
        
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse-green 2s infinite;"></div>
            <span class="traffic-text">Live Campus Traffic: <strong id="activeVisitors" style="color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5);">--</strong> Online</span>
        </div>

        <div id="liveClock" class="clock-text">
            Initializing Time Protocol...
        </div>
    </div>

    <style>
        @keyframes pulse-green {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
    </style>
    <header>
        <marquee id="live-ticker-text" style="color: var(--text-main); font-size: 0.9rem; margin-left: 15px; font-weight: 500;" scrollamount="5">
            Loading live updates...
        </marquee>
        <div class="header-container container flex justify-between items-center">
            <div class="college-branding" style="display: flex; align-items: center; gap: 15px;">
                <img class="college-logo" src="https://aryavidyapeeth.webdcl.com/images/logo.png" alt="College logo" height="55px" width="55px" style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));">
                <div class="college-names" style="text-align: left; line-height: 1.2;">
                    <p class="college-name-en" style="font-weight: 700; color: #fff; margin: 0; font-size: 1.1rem; letter-spacing: 0.02em;">Arya Vidyapeeth College (Autonomous)</p>
                    <p class="college-name-as" style="font-weight: 500; color: var(--text-dim); margin: 0; font-size: 0.9rem;">আর্য্য বিদ্যাপীঠ মহাবিদ্যালয় (স্বায়ত্তশাসিত)</p>
                </div>
            </div>
    
            <div class="dept-nav-area" style="display: flex; flex-direction: column; align-items: flex-end; gap: 5px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div class="logo" style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.5rem; color: var(--primary); text-shadow: 0 0 15px var(--primary-glow);">
                        <dotlottie-wc src="https://lottie.host/b591dbd3-2f76-46d5-9a96-a0b97b60d11b/PY2eF3h4KP.lottie" autoplay loop class="animated-lottie-logo" style="width: 40px; height: 40px;"></dotlottie-wc>
                        <span>PHYSICA</span>
                    </div>
                    
                    <button id="theme-toggle" onclick="toggleTheme()" style="background: rgba(148, 163, 184, 0.15); border: 1px solid var(--border); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow);" onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='scale(1)';">
                        ☀️
                    </button>
                </div>
                <nav>
                    <ul class="flex" id="mainNav" style="list-style: none; gap: 5px;"></ul>
                </nav>
            </div>
        </div>
    </header>
    <main id="app" class="container" style="padding-bottom: 3rem; min-height: 80vh;">
    </main>

    <div class="astronaut-container">
        <div id="mascotBubble" class="mascot-bubble">Hi! I am Astro. Welcome to our Physics Portal!</div>
        <img src="https://raw.githubusercontent.com/shibom-lang/projects/refs/heads/main/vecteezy_cartoon-astronaut-celebrating-in-space-outer-space-digital_56706303.png" class="astronaut-img" onclick="document.getElementById('mascotBubble').classList.toggle('show')" alt="Astro Mascot">
    </div>

    <script>
        // --- CONFIGURATION ---
        const API_URL = "https://physica-portal-production.up.railway.app/api";

        // --- DATA STORE ---
        const STATIC_DATA = {

            magazines: {
                kalavatika: {
                    title: "🎨 Kalavatika",
                    issue: "Volume 12, 2026",
                    content: "<h3>Welcome to Kalavatika</h3><p>This section features the scanned copies of our wall magazine...</p>"
                },
                annual: {
                    title: "📖 Annual Department Magazine",
                    issue: "Edition 2025-26",
                    content: "<h3>Annual Publication</h3><p>Featuring research papers, student articles, and department highlights...</p>"
                }
            }
        };
        let currentUser = JSON.parse(localStorage.getItem('physicaUser')) || null;
        const routes = {
            home: renderHome,
            faculty: renderFaculty,
            magazines: renderMagazines,
            blogs: renderBlogs,
            resources: renderResources,
            login: renderLogin,
            notices: renderNotices,
            research: renderResearch,
            gallery: renderGallery,
            dashboard: goToDashboard
        };

        // --- NAVIGATION ---
        function navigate(page) {
            if (routes[page]) routes[page]();
            updateNav(page);
        }

        function updateNav(activePage) {
            const pages = currentUser ? 
                (currentUser.role === 'teacher' ? ['home', 'faculty', 'notices', 'magazines', 'blogs', 'resources'] : ['home', 'faculty', 'notices', 'magazines', 'resources']) : 
                ['home', 'faculty', 'notices', 'magazines', 'blogs', 'resources', 'login'];
            
            const nav = document.getElementById('mainNav');
            nav.innerHTML = pages.map(p => 
                `<li><a class="nav-link ${p === activePage ? 'active' : ''}" onclick="navigate('${p}')" style="cursor: pointer;">${p.toUpperCase()}</a></li>`
            ).join('');

            if (currentUser) {
                nav.innerHTML += `<li><a class="nav-link" onclick="logout()" style="cursor: pointer; color: var(--error);">LOGOUT</a></li>`;
                
                // 🔴 FIX: Added the active class check and changed onclick to navigate('dashboard')
                nav.innerHTML += `<li><a class="nav-link ${activePage === 'dashboard' ? 'active' : ''}" onclick="navigate('dashboard')" style="cursor: pointer;">DASHBOARD</a></li>`;
            }
        }
        function goToDashboard() {
            if (currentUser.role === 'teacher') renderTeacherDash();
            else renderStudentDash();
        }

        function logout() {
            currentUser = null;
            localStorage.removeItem('physicaUser'); 
            navigate('home');
        }
        // ---  LIGHT/DARK THEME LOGIC ---
        function toggleTheme() {
            const body = document.body;
            const toggleBtn = document.getElementById('theme-toggle');
            
            if (body.classList.contains('light-theme')) {
                // Switch back to Dark Space Theme
                body.classList.remove('light-theme');
                localStorage.setItem('physicaTheme', 'dark');
                toggleBtn.innerHTML = '☀️'; 
                toggleBtn.style.background = 'rgba(148, 163, 184, 0.15)';
            } else {
                // Switch to Light Academic Theme
                body.classList.add('light-theme');
                localStorage.setItem('physicaTheme', 'light');
                toggleBtn.innerHTML = '🌙'; 
                toggleBtn.style.background = 'rgba(0, 102, 204, 0.1)';
            }
        }

        // Check if the user previously chose light mode
        function initializeTheme() {
            const savedTheme = localStorage.getItem('physicaTheme');
            if (savedTheme === 'light') {
                document.body.classList.add('light-theme');
                document.getElementById('theme-toggle').innerHTML = '🌙';
            }
        }
        /// 📢 FETCH LIVE NOTICES FOR THE TICKER (36-HOUR EXPIRATION)
        async function loadLiveTicker() {
            const tickerEl = document.getElementById('live-ticker-text');
            if (!tickerEl) return;
            
            const baseMessage = "✨ Welcome to the Department of Physics, Arya Vidyapeeth College.";
            
            try {
                const res = await fetch(`${API_URL}/notices`);
                const notices = await res.json();
                
                // Calculate the exact timestamp for 36 hours ago
                const thirtySixHoursAgo = new Date(Date.now() - (36 * 60 * 60 * 1000));

                // Filter out any notices older than 36 hours
                const recentNotices = notices.filter(n => new Date(n.date) >= thirtySixHoursAgo);

                // If there are NO notices from the last 36 hours
                if (recentNotices.length === 0) {
                    tickerEl.innerHTML = `${baseMessage} No new updates at this time.`;
                    return;
                }

                // If there ARE new notices, format them with the "NEW" tag
                const formattedNotices = recentNotices.slice(0, 5).map(n => `🚨 <b>NEW:</b> ${n.title}`);
                
                // Combine the base message with the new notices
                tickerEl.innerHTML = `${baseMessage} &nbsp;&nbsp;&nbsp;&nbsp; ${formattedNotices.join(' &nbsp;&nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;&nbsp; ')}`;

            } catch (err) {
                console.error("Ticker load failed:", err);
                tickerEl.innerHTML = `${baseMessage} No new updates at this time.`;
            }
        }

        // --- PAGE RENDERS ---
        function renderHome() {
            document.getElementById('app').innerHTML = `
                <div class="hero" style="padding: 5rem 0 3rem; position: relative;">
                    <div style="display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; background: rgba(0, 136, 255, 0.08); border: 1px solid rgba(0, 136, 255, 0.25); border-radius: 100px; font-size: 0.7rem; font-weight: 700; color: var(--primary); margin-bottom: 1.2rem; letter-spacing: 0.12em; text-transform: uppercase; backdrop-filter: blur(8px);">
                        <span style="width: 5px; height: 5px; background: var(--primary); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--primary);"></span>
                        Estd. 1962
                    </div>

                    <h1 style="font-size: clamp(2.5rem, 8vw, 4rem); line-height: 1.1; margin-bottom: 0.5rem; background: linear-gradient(to bottom, #fff 60%, rgba(255,255,255,0.7)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Department of Physics</h1>
                    <h2 style="font-size: 1.25rem; color: var(--text-dim); margin-bottom: 1.5rem; font-weight: 500; letter-spacing: 0.05em; font-family: 'IBM Plex Mono', monospace;">ARYA VIDYAPEETH COLLEGE (AUTONOMOUS)</h2>
                    
                    <p style="max-width: 650px; margin: 0 auto; font-size: 1.1rem; color: var(--text-tertiary); line-height: 1.6;">
                        Exploring the Universe from <span style="color: var(--primary);">Quarks to Cosmos</span>, one equation at a time.
                    </p>
                </div>

                <div class="swiper heroSwiper mb-4" style="width: 100%; height: 450px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 4rem;">
                    <div class="swiper-wrapper" id="dynamic-slider-wrapper">
                        <div class="swiper-slide" style="background: #0a0e1a; display: flex; align-items: center; justify-content: center; color: var(--text-dim);">
                            Loading latest department highlights...
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-next" style="color: var(--primary);"></div>
                    <div class="swiper-button-prev" style="color: var(--primary);"></div>
                </div>

                <div class="stats-grid" style="margin-bottom: 4rem;">
                    <div class="card stat-card" style="border-bottom: 3px solid var(--primary);">
                        <div class="stat-value">15+</div>
                        <div class="stat-label">Research Papers</div>
                    </div>
                    <div class="card stat-card" style="border-bottom: 3px solid var(--warning);">
                        <div class="stat-value">7</div>
                        <div class="stat-label">Faculty Members</div>
                    </div>
                    <div class="card stat-card" style="border-bottom: 3px solid var(--success);">
                        <div class="stat-value">120+</div>
                        <div class="stat-label">Students</div>
                    </div>
                    <div class="card stat-card" style="border-bottom: 3px solid --tertiary: #FFD700;;">
                        <div class="stat-value">3+</div>
                        <div class="stat-label">Lab Facilities</div>
                    </div>
                </div>
  
                <div class="grid grid-2">
                    <div class="card" onclick="navigate('gallery')" style="cursor: pointer;">
                        <div class="card-header"><span style="font-size: 1.5rem;">📸</span> <span>Events & Gallery</span></div>
                        <div class="card-body">
                            <p>From society picnics to birth anniversaries of legendary physicists, explore our vibrant campus life.</p>
                            <p style="color: var(--success); margin-top: 15px; font-weight: 600; font-size: 0.9rem;">👉 View Photo Archive</p>
                        </div>
                    </div>
                    <div class="card" onclick="navigate('research')" style="cursor: pointer;">
                        <div class="card-header"><span>🔬</span> <span>Research & Innovation</span></div>
                        <div class="card-body">
                            <p>Explore our collaborative projects, scientific models, and innovations developed by students and faculty.</p>
                            <p style="color: var(--primary); margin-top: 15px; font-weight: 600; font-size: 0.9rem;">👉 View Publications</p>
                        </div>
                    </div>
                    <div class="card" style="cursor: pointer;" onclick="openAchievementFeed('academic', '📚 Academic Excellence')">
                        <div class="card-header"><span>📚</span> <span>Academic Excellence</span></div>
                        <div class="card-body">
                            <p>Undergraduate programs built for theoretical mastery and lab skills. See our students excelling in IIT JAM, CUET, and NCC.</p>
                            <span style="display:inline-block; margin-top:10px; color:var(--tartiary); font-size:0.85rem; font-weight:bold;">👉 Student Portfolio</span>
                        </div>
                    </div>
                    <div class="card" style="cursor: pointer;" onclick="openAchievementFeed('activity', '🌟 Student Activities')">
                        <div class="card-header"><span>🌟</span> <span>Student Activities</span></div>
                        <div class="card-body">
                            <p>Regular seminars, workshops, and inter-college competitions. Join our dynamic environment of creativity.</p>
                            <span style="display:inline-block; margin-top:10px; color:var(--warning); font-size:0.85rem; font-weight:bold;">👉 Activity Gallery</span>
                        </div>
                    </div>
                </div>
            `;
            loadDynamicSlider();
        }

        async function renderFaculty() {
            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 2rem; font-size: 2.5rem; color: var(--primary);">Faculty</h2>
                <div id="faculty-loader" class="text-center" style="color: var(--primary);">Loading dynamic profiles...</div>
                <div id="faculty-grid" class="faculty-grid hidden"></div>
            `;

            try {
                const res = await fetch(`${API_URL}/faculty`);
                const facultyData = await res.json();
                const container = document.getElementById('faculty-grid');
                
                document.getElementById('faculty-loader').classList.add('hidden');
                container.classList.remove('hidden');

                if (facultyData.length === 0) {
                    container.innerHTML = `<p class="text-center" style="color: var(--text-dim); grid-column: 1/-1;">No faculty members registered yet.</p>`;
                    return;
                }

                container.innerHTML = facultyData.map(f => `
                    <div class="card faculty-card" style="border-top: 4px solid var(--secondary);">
                    
                        
                       ${f.profilePicture 
                         ? `<img src="${f.profilePicture.replace(/\\/g, '/')}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin: 0 auto 1.5rem; border: 3px solid var(--primary); box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);">` 
                        : `<div class="faculty-avatar" style="font-size: 5rem; margin-bottom: 1rem;"></div>`
                          }
                        
                        <h3 style="color: white; margin-bottom: 0.5rem; font-size: 1.4rem;">${f.name}</h3>
                        <p style="color: var(--primary); margin-bottom: 0.5rem; font-weight: bold; letter-spacing: 0.05em;">${f.designation || 'Faculty Member'}</p>
                        <p style="font-size: 0.9rem; margin-bottom: 1rem; color: var(--accent);">${f.qualifications || 'Qualifications pending'}</p>
                        
                        <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.05);">
                            <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.6; font-style: italic;">"${f.bio}"</p>
                        </div>
                        
                        <a href="mailto:${f.username}@avcollege.ac.in" class="btn btn-outline btn-sm" style="width: 100%; border-color: rgba(255,255,255,0.2); color: var(--text-dim);">✉️ Contact Faculty</a>
                    </div>
                `).join('');
            } catch (err) {
                document.getElementById('faculty-loader').innerHTML = "Server Offline";
            }
        }

        async function renderMagazines() {
            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 2rem; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.1);">Departmental Magazines</h2>
                <div class="grid grid-2">
                    
                    <div class="card" style="padding: 0; overflow: hidden; border: 1px solid rgba(0, 136, 255, 0.2);">
                        <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(0, 136, 255, 0.1)); padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 1.5rem;">
                            <div style="width: 55px; height: 55px; background: rgba(0,0,0,0.4); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0, 136, 255, 0.3); box-shadow: 0 4px 15px rgba(0, 136, 255, 0.2); flex-shrink: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="13.5" cy="5.5" r="2.5"/>
                                    <circle cx="18.5" cy="10.5" r="2.5"/>
                                    <circle cx="8.5" cy="8.5" r="2.5"/>
                                    <circle cx="10.5" cy="14.5" r="2.5"/>
                                    <path d="M21.5 16.5C21.5 19.5 19.5 21.5 16.5 21.5C13.5 21.5 10.5 18.5 7.5 15.5C4.5 12.5 2.5 9.5 2.5 6.5C2.5 3.5 4.5 2.5 7.5 2.5C10.5 2.5 13.5 5.5 16.5 8.5C19.5 11.5 21.5 13.5 21.5 16.5Z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 style="color: white; margin-bottom: 0.2rem; font-size: 1.4rem;">Kalavatika</h3>
                                <p style="color: var(--text-tertiary); font-size: 0.85rem; margin: 0; line-height: 1.4;">Student creativity showcase through poems, blogs, and visual art.</p>
                            </div>
                        </div>
                        <div style="padding: 1.5rem;" id="kalavatika-list">
                            <p style="color: var(--text-dim); text-align: center;">Loading issues...</p>
                        </div>
                    </div>

                    <div class="card" style="padding: 0; overflow: hidden; border: 1px solid rgba(16, 185, 129, 0.2);">
                        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1)); padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 1.5rem;">
                            <div style="width: 55px; height: 55px; background: rgba(0,0,0,0.4); border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2); flex-shrink: 0;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 style="color: white; margin-bottom: 0.2rem; font-size: 1.4rem;">Annual Magazine</h3>
                                <p style="color: var(--text-tertiary); font-size: 0.85rem; margin: 0; line-height: 1.4;">Departmental highlights blending science with creativity.</p>
                            </div>
                        </div>
                        <div style="padding: 1.5rem;" id="annual-list">
                            <p style="color: var(--text-dim); text-align: center;">Loading issues...</p>
                        </div>
                    </div>

                </div>
            `;

            try {
                const userRole = currentUser ? currentUser.role : 'outsider';
                const res = await fetch(`${API_URL}/resources?role=${userRole}`);
                const files = await res.json();
                
                const kFiles = files.filter(f => f.type === 'Kalavatika');
                const aFiles = files.filter(f => f.type === 'Annual');

                // Upgraded beautiful file rows
                const createLink = (f) => `
                    <a href="${f.filePath}" target="_blank" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 0.75rem; text-decoration: none; transition: all 0.2s; color: var(--text-main);" onmouseover="this.style.background='rgba(0,136,255,0.05)'; this.style.borderColor='rgba(0,136,255,0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.02)'; this.style.borderColor='rgba(255,255,255,0.05)';">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                            <span style="font-weight: 500;">${f.title}</span>
                        </div>
                        <span style="display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 0.85rem; font-weight: 600;">
                            Download 
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </span>
                    </a>
                `;

                document.getElementById('kalavatika-list').innerHTML = kFiles.length ? kFiles.map(createLink).join('') : '<p style="color: var(--text-tertiary); font-size: 0.875rem; text-align: center; padding: 1rem 0;">No issues available yet.</p>';
                document.getElementById('annual-list').innerHTML = aFiles.length ? aFiles.map(createLink).join('') : '<p style="color: var(--text-tertiary); font-size: 0.875rem; text-align: center; padding: 1rem 0;">No issues available yet.</p>';
            } catch (err) { 
                console.error(err);
                document.getElementById('kalavatika-list').innerHTML = '<p style="color: var(--error); text-align: center;">Server offline</p>';
                document.getElementById('annual-list').innerHTML = '<p style="color: var(--error); text-align: center;">Server offline</p>';
            }
        }

        function renderResources() {
            if (!currentUser) {
                document.getElementById('app').innerHTML = `
                    <div style="max-width: 600px; margin: 4rem auto; position: relative;">
                        <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 150px; height: 150px; background: var(--primary); filter: blur(90px); opacity: 0.3; z-index: 0; pointer-events: none;"></div>
                        
                        <div class="card text-center" style="padding: 4rem 3rem; border-top: 4px solid var(--primary); background: linear-gradient(180deg, rgba(0, 136, 255, 0.05) 0%, var(--surface) 100%); position: relative; z-index: 1; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                            
                            <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; background: rgba(0, 136, 255, 0.1); border: 1px solid rgba(0, 136, 255, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(0, 136, 255, 0.2);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px var(--primary-glow));">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>

                            <h2 style="font-size: 2rem; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.02em;">Secure Repository</h2>
                            <div style="width: 40px; height: 3px; background: var(--primary); margin: 0 auto 1.5rem; border-radius: 2px; box-shadow: 0 0 10px var(--primary-glow);"></div>
                            
                            <p style="color: var(--text-dim); font-size: 1.05rem; margin-bottom: 0.5rem; line-height: 1.6;">
                                Academic resources and lecture notes are exclusively available to authorized personnel and enrolled students.
                            </p>
                            <p style="color: var(--text-tertiary); font-size: 0.9rem; margin-bottom: 2.5rem;">
                                Guests may freely explore our public Research Portfolio, Event Gallery, and Department Journal.
                            </p>
                            
                            <button onclick="navigate('login')" class="btn btn-primary" style="padding: 0.8rem 2.5rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.2);">
                                Authenticate to Access
                            </button>
                        </div>
                    </div>
                `;
                return;
            }

            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 2rem; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.1);">Study Resources</h2>
                <div class="card">
                    <div class="card-header">Available Downloads</div>
                    <div class="card-body" id="resources-list">
                        <p style="color: var(--text-dim);">Loading resources...</p>
                    </div>
                </div>
            `;
            loadFiles('resources-list');
        }

        function renderLogin() {
            document.getElementById('app').innerHTML = `
                <div style="max-width: 500px; margin: 4rem auto;">
                    <div id="login-form" class="card">
                        <div class="card-header" style="border: none; padding-bottom: 0.5rem; justify-content: center;">
                            <h2 style="font-size: 1.5rem; color: var(--text-main); text-shadow: 0 0 10px rgba(0,136,255,0.3);">PORTAL LOGIN</h2>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleLogin(event)">
                                <label>Username</label>
                                <input type="text" id="username" required>
                                <label>Password</label>
                                <input type="password" id="password" required>
                                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">ENTER PORTAL</button>
                            </form>
                            <p class="text-center mt-4 text-sm" style="color: var(--text-dim);">
                                New here? <a onclick="toggleForms()" style="color: var(--primary); font-weight: 600; cursor:pointer; text-decoration: none; text-shadow: 0 0 8px rgba(0,136,255,0.3);">Initialize Account</a>
                            </p>
                        </div>
                    </div>
        
                    <div id="signup-form" class="card hidden">
                        <div class="card-header" style="border: none; padding-bottom: 0.5rem; justify-content: center;">
                            <h2 style="font-size: 1.5rem; color: var(--success); text-shadow: 0 0 10px rgba(16,185,129,0.3);">REGISTER</h2>
                        </div>
                        <div class="card-body">
                            <form onsubmit="handleRegister(event)">
                                <label>Full Name</label>
                                <input type="text" name="name" placeholder="e.g. Rahul Sharma" required>
                                
                                <label>Role</label>
                                <select name="role" id="roleSelect" onchange="toggleRoleFields()">
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>

                                <div id="student-fields">
                                    <label>12-Digit Roll Number</label>
                                    <input type="text" name="rollNumber" placeholder="e.g. 123456789012" minlength="12" maxlength="12">
                                    
                                    <label>Semester</label>
                                    <input type="text" name="semester" placeholder="e.g. 4th Semester">
                                </div>
                                
                                <div id="teacher-fields" class="hidden">
                                    <label>Choose Username</label>
                                    <input type="text" name="username" placeholder="e.g. prof_subir">

                                    <label>Designation</label>
                                    <input type="text" name="designation" placeholder="e.g. Assistant Professor">
                                    
                                    <label style="color: var(--accent);">🔒 Teacher Secret Code</label>
                                    <input type="password" name="adminCode" placeholder="Required for Teachers">
                                </div>

                                <label>Choose Password</label>
                                <input type="password" name="password" placeholder="Strong Password" required>

                                <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1rem;">CREATE ACCOUNT</button>
                            </form>
                            <p class="text-center mt-4 text-sm" style="color: var(--text-dim);">
                                Has account? <a onclick="toggleForms()" style="color: var(--primary); font-weight: 600; cursor:pointer;">Login</a>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        } 

        // --- AUTHENTICATION FUNCTIONS ---
        async function handleLogin(e) {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;
            try {
                const res = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: u, password: p })
                });
                
                const data = await res.json(); //  Get the data first

                if (res.ok) {
                    // Check if the server sent an approved status
                    if (data.role === 'student' && data.status === 'pending') {
                        alert(" Access Denied: Your account is waiting for Teacher Approval.");
                        return;
                    }
                    
                    currentUser = data;
                    localStorage.setItem('physicaUser', JSON.stringify(currentUser)); 
                    alert(`✅ Welcome ${currentUser.name}`);
                    navigate('dashboard'); 
                    
                } else { 
                    alert(` ${data.message || "Invalid Credentials"}`); 
                }
            } catch (err) { alert("Server Error"); }
        }
        function toggleForms() {
            document.getElementById('login-form').classList.toggle('hidden');
            document.getElementById('signup-form').classList.toggle('hidden');
        }

        function toggleRoleFields() {
            const role = document.getElementById('roleSelect').value;
            if(role === 'teacher') { 
                document.getElementById('teacher-fields').classList.remove('hidden'); 
                document.getElementById('student-fields').classList.add('hidden'); 
            } else { 
                document.getElementById('teacher-fields').classList.add('hidden'); 
                document.getElementById('student-fields').classList.remove('hidden'); 
            }
        }

        async function handleRegister(e) {
            e.preventDefault();
            const form = e.target;
            
            const role = form.role.value.toLowerCase(); 
            const userData = {
                name: form.name.value,
                password: form.password.value,
                role: role,
                // ... rest of your existing code ...,
                semester: form.semester ? form.semester.value : '',
                rollNumber: form.rollNumber ? form.rollNumber.value : '',
                username: form.username ? form.username.value : '', // Only teachers use this
                designation: form.designation ? form.designation.value : '',
                adminCode: form.adminCode ? form.adminCode.value : ''
            };
        
            try {
                const res = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                
                const data = await res.json();
        
                if (res.ok) { 
                    if (role === 'student') {
                        alert(`✅ Registration Sent!\n\nYour Official Username is:\n👉 ${data.generatedUsername} 👈\n\nPlease save this! You can login once a teacher approves your account.`);
                    } else {
                        alert(`✅ Teacher Account Created! Please Login.`);
                    }
                    toggleForms(); 
                    form.reset();
                } 
                else { alert("❌ Failed: " + data.message); }
            } catch (err) { alert("Server Error"); }
        }

        // --- DASHBOARDS ---
        function renderTeacherDash() {
            document.getElementById('app').innerHTML = `
                <div class="dashboard-layout">
                    <aside class="sidebar">
                        <div class="card text-center" style="margin-bottom: 1.5rem;">
                                                   
                            ${currentUser.profilePicture 
                            ? `<img src="${currentUser.profilePicture.replace(/\\/g, '/')}" style="width: 96px; height: 96px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 2px solid var(--primary);">` 
                           : `<div class="faculty-avatar" style="margin: 0 auto 1rem;">🧑🏻‍🏫</div>`
                             }
                            <h4 style="margin-bottom: 0.5rem;">${currentUser.name}</h4>
                            <p class="text-sm" style="color: var(--text-dim);">${currentUser.designation}</p>
                            <span style="display:inline-block; margin-top: 0.75rem; background: rgba(0, 136, 255, 0.15); color: var(--accent); padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">Teacher</span>
                        </div>
                        <nav>
                            <div class="menu-item active" onclick="switchTab('t-upload')">📁 Repository</div>
                            <div class="menu-item" onclick="switchTab('t-blog')">✍️ Blog Writer</div>
                            <div class="menu-item" onclick="switchTab('t-approve'); loadPendingStudents(); loadPendingBlogs();">👥 Approvals</div>
                            <div class="menu-item" onclick="switchTab('t-notice')">📢 Post Notice</div> 
                            <div class="menu-item" onclick="switchTab('t-research')">🔬 Share Research</div>
                            <div class="menu-item" onclick="switchTab('t-profile')">⚙️ Profile Settings</div>
                            <div class="menu-item" onclick="switchTab('t-gallery'); loadHighlightsDropdown('t-highlight-select');">📸 Event Gallery</div>
                            <div class="menu-item" onclick="switchTab('t-achievement')">🏆 Post Achievement</div>   
                            <div class="menu-item" onclick="switchTab('t-slider')" style="border-left: 3px solid var(--primary);">🖼️ Manage Homepage Slider</div>
                        </nav>
                    </aside>
                    <section class="content-area">
                        
                        
                        <div id="t-upload" class="tab-content">
                            <h2 class="mb-4">Repository Manager</h2>
                            <div class="card mb-4" style="border-left: 4px solid var(--primary);">
                                <div class="card-header">Upload File</div>
                                <div class="card-body">
                                    <form onsubmit="handleUpload(event, 'teacher')">
                                        <label>File Title</label>
                                        <input type="text" name="title" placeholder="e.g. Quantum Mechanics Notes" required>
                                        
                                        <label>Category</label>
                                        <select name="docType" required onchange="document.getElementById('academic-fields').style.display = this.value === 'Resource' ? 'block' : 'none';" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text-main); margin-bottom: 1rem;">
                                            <option value="Resource">📚 Study Resource (Notes)</option>
                                            <option value="Kalavatika">🎨 Kalavatika Magazine</option>
                                            <option value="Annual">📖 Annual Magazine</option>
                                        </select>
                                        
                                        <div id="academic-fields">
                                            <div class="grid grid-2" style="gap: 1rem;">
                                                <div>
                                                    <label>Semester</label>
                                                    <input type="text" name="semester" placeholder="e.g., 3rd Semester">
                                                </div>
                                                <div>
                                                    <label>Subject</label>
                                                    <input type="text" name="subject" placeholder="e.g., Quantum Physics">
                                                </div>
                                            </div>
                                            <label style="margin-top: 10px;">Topic / Tags</label>
                                            <input type="text" name="topic" placeholder="e.g., Wave Functions, Schrödinger">
                                        </div>
                                        
                                        <label style="margin-top: 1rem; color: var(--success);">Select File</label>
                                        <input type="file" name="file" required>
                                        
                                        <button type="submit" class="btn btn-primary" style="margin-top:1rem; width: 100%;">📤 Upload File</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                       <div id="t-slider" class="tab-content hidden">
                            <div style="margin-bottom: 2rem;">
                                <h2 style="margin: 0; color: var(--text-main);">🖼️ Manage Homepage Slider</h2>
                                <p style="color: var(--text-dim); margin: 0.5rem 0 0 0; font-size: 0.95rem;">Upload high-resolution banners to feature on the portal's main landing page.</p>
                            </div>

                            <div class="card" style="border-left: 4px solid var(--primary); padding: 2.5rem 2rem; background: linear-gradient(135deg, rgba(0, 136, 255, 0.05) 0%, transparent 100%);">
                                <form id="carouselForm" onsubmit="uploadCarouselSlide(event)">
                                    
                                    <div style="margin-bottom: 2rem;">
                                        <label style="display: block; font-weight: 600; color: var(--text-main); margin-bottom: 0.75rem;">Slide Title <span style="color: var(--accent);">*</span></label>
                                        <input type="text" id="carouselTitle" required placeholder="e.g., Welcome Batch 2026 or Department Picnic" 
                                            style="width: 100%; padding: 14px 16px; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 8px; color: white; font-size: 1rem; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);"
                                            onfocus="this.style.borderColor='var(--primary)'; this.style.boxShadow='0 0 0 3px rgba(0, 136, 255, 0.15)';" 
                                            onblur="this.style.borderColor='var(--border)'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.2)';">
                                    </div>

                                    <div style="margin-bottom: 2.5rem;">
                                        <label style="display: block; font-weight: 600; color: var(--text-main); margin-bottom: 0.75rem;">Banner Image <span style="color: var(--accent);">*</span></label>
                                        
                                        <div style="position: relative; border: 2px dashed rgba(0, 136, 255, 0.3); border-radius: 12px; background: rgba(0, 136, 255, 0.02); padding: 3rem 2rem; text-align: center; transition: all 0.3s ease; cursor: pointer; overflow: hidden;" 
                                            onmouseover="this.style.borderColor='var(--primary)'; this.style.background='rgba(0, 136, 255, 0.08)'; this.style.transform='translateY(-2px)';" 
                                            onmouseout="this.style.borderColor='rgba(0, 136, 255, 0.3)'; this.style.background='rgba(0, 136, 255, 0.02)'; this.style.transform='translateY(0)';">
                                            
                                            <input type="file" id="carouselImage" accept="image/*" required 
                                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;" 
                                                onchange="document.getElementById('file-name-display').innerHTML = this.files[0] ? '<span style=\'color: var(--primary); font-weight: bold;\'>✅ ' + this.files[0].name + '</span>' : 'Browse files or drag & drop here';">
                                            
                                            <div style="pointer-events: none;">
                                                <div style="width: 64px; height: 64px; background: rgba(0, 136, 255, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.2rem; border: 1px solid rgba(0, 136, 255, 0.2); box-shadow: 0 0 20px rgba(0, 136, 255, 0.1);">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 5px var(--primary-glow));">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                        <polyline points="21 15 16 10 5 21"></polyline>
                                                    </svg>
                                                </div>
                                                <h4 style="margin: 0 0 0.5rem 0; color: var(--text-main); font-size: 1.15rem; font-weight: 600;">Upload High-Res Banner</h4>
                                                <p id="file-name-display" style="color: var(--text-dim); font-size: 0.95rem; margin: 0;">Browse files or drag & drop here</p>
                                                <p style="color: var(--text-tertiary); font-size: 0.8rem; margin-top: 0.75rem;">Recommended: 1920x1080px (JPG, PNG)</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem; font-size: 1.05rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,136,255,0.25);">
                                        🚀 Push to Live Homepage
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div id="t-blog" class="tab-content hidden">
                            <h2 class="mb-4">Department Blog Writer</h2>
                            <div class="card" style="border-left: 4px solid var(--primary);">
                                <form id="blog-upload-form" onsubmit="handleBlog(event)">
                                    <label>Blog Title</label>
                                    <input type="text" name="title" id="blogTitle" placeholder="e.g. The Future of Quantum Computing" required>
                                    
                                    <label style="color: var(--accent);">Cover Image / SEO Infographic (Optional)</label>
                                    <input type="file" name="image" id="blogImage" accept="image/*">
                                    
                                    <label style="color: var(--success);">Upload Manuscript (Word Doc / PDF - Optional)</label>
                                   <input type="file" name="document" id="blogDocument" accept=".doc,.docx,.pdf">
    
                                 <div style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
                                  <label style="display: block; color: var(--text-main); font-weight: 600; margin-bottom: 0.5rem; font-size: 0.95rem;"> 
                                 📊 SEO Infographic 
                                  <span style="color: var(--tartiary); font-size: 0.8rem; font-weight: normal; margin-left: 8px;">(Auto-inserts into the middle of your text)</span>
                               </label>
        
                               <div style="position: relative; border: 2px dashed rgba(0, 136, 255, 0.3); border-radius: 12px; background: rgba(0, 136, 255, 0.02); padding: 2rem 1rem; text-align: center; transition: all 0.3s ease; cursor: pointer; overflow: hidden;" 
                                    onmouseover="this.style.borderColor='var(--primary)'; this.style.background='rgba(0, 136, 255, 0.08)'; this.style.boxShadow='0 0 20px rgba(0, 136, 255, 0.15)';" 
                                      onmouseout="this.style.borderColor='rgba(0, 136, 255, 0.3)'; this.style.background='rgba(0, 136, 255, 0.02)'; this.style.boxShadow='none';">
                             <input type="file" name="infographic" id="blogInfographic" accept="image/*" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
                             <div style="pointer-events: none;">
                             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 0.75rem; filter: drop-shadow(0 0 8px var(--primary-glow));">
                             <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                             <circle cx="8.5" cy="8.5" r="1.5"></circle>
                             <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.2rem; font-size: 1.05rem;">Click to upload visual data</p>
                           <p style="color: var(--text-dim); font-size: 0.85rem; margin: 0;">Supports JPG, PNG, or WebP</p>
                    </div>
                 </div>
                 </div>
                <label>Blog Content / Summary</label>
                                <textarea name="content" id="blogContent" rows="6" placeholder="Write your blog content here, or write a short summary if you attached a Word Document..."></textarea>
                                    
                                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">🚀 Publish Blog</button>
                                </form>
                            </div>
                        </div>

                        <div id="t-approve" class="tab-content hidden">
                            <h2 class="mb-4">Dashboard Approvals</h2>
                            
                            <div class="card mb-4" style="border-left: 4px solid var(--primary);">
                                <div class="card-header">Pending Student Accounts</div>
                                <div class="card-body" id="pending-list">Loading...</div>
                            </div>

                            <div class="card" style="border-left: 4px solid var(--warning);">
                                <div class="card-header">Pending Student Articles</div>
                                <div class="card-body" id="pending-blogs-list">Loading...</div>
                            </div>
                        </div>

                        <div id="t-notice" class="tab-content hidden">
                            <h2 class="mb-4">Broadcast Notice</h2>
                            <div class="card">
                                <form onsubmit="handleNoticePost(event)">
                                    <label>Notice Title</label>
                                    <input type="text" name="title" placeholder="e.g. End Semester Exam Schedule" required>
                                    <label>Description / Details</label>
                                    <textarea name="content" rows="4" placeholder="Write the announcement details here..."></textarea>
                                    <label>Attach File (Optional PDF/Image)</label>
                                    <input type="file" name="file">
                                    <button type="submit" class="btn btn-primary" style="background: var(--accent); width: 100%; margin-top: 1rem;">Broadcast to Notice Board</button>
                                </form>
                            </div>
                        </div>

                        <div id="t-research" class="tab-content hidden">
                            <h2 class="mb-4">Post to Research Feed</h2>
                            <div class="card">
                                <form onsubmit="handleResearchPost(event)">
                                    <div style="background: var(--surface-elevated); padding: 15px; border-radius: 8px; border: 1px dashed rgba(0, 136, 255, 0.5); margin-bottom: 20px;">
                                        <p style="font-size: 0.85rem; color: var(--accent); margin-bottom: 10px;"><strong>Uploading for an Ex-Student?</strong> (Leave blank if posting for yourself)</p>
                                        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px;">
                                            <div>
                                                <label>Credit Author Name</label>
                                                <input type="text" name="customAuthor" placeholder="e.g. Rahul Sharma (Alumni)">
                                            </div>
                                            <div>
                                                <label>Role</label>
                                                <select name="customRole">
                                                    <option value="Faculty">Faculty (Me)</option>
                                                    <option value="Alumni">Alumni / Ex-Student</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <label>Research Title</label>
                                    <input type="text" name="title" placeholder="e.g. Quantum Entanglement Study" required>
                                    <label>Caption / Summary</label>
                                    <textarea name="caption" rows="4" placeholder="Talk about the lab work, patent, or project..." required></textarea>
                                    <label style="color: var(--accent); margin-top: 10px;">Cover Photo (Optional Image)</label>
                                    <input type="file" name="photo" accept="image/*">
                                    <label style="color: var(--success); margin-top: 10px;">Research Document (Optional PDF)</label>
                                    <input type="file" name="document" accept=".pdf,.doc,.docx">
                                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">Publish to Feed</button>
                                </form>
                            </div>
                        </div>

                        <div id="t-profile" class="tab-content hidden">
                            <h2 class="mb-4" style="color: var(--primary);">Update Your Profile</h2>
                            <div class="card">
                                <form onsubmit="handleProfileUpdate(event)">
                                    <div style="text-align: center; margin-bottom: 2rem; padding: 20px; background: rgba(0, 217, 255, 0.05); border-radius: 10px; border: 1px dashed var(--primary);">
                                        <p style="color: var(--text-main); margin-bottom: 10px; font-weight: bold;">Upload Professional Headshot</p>
                                        <input type="file" name="profilePic" accept="image/*" style="max-width: 300px; margin: 0 auto; display: block;">
                                    </div>
                                    <label class="text-sm">Highest Qualifications</label>
                                    <input type="text" name="qualifications" placeholder="e.g. M.Sc, PhD in Particle Physics" value="${currentUser.qualifications || ''}">
            
                                    <label class="text-sm">Short Bio</label>
                                    <textarea name="bio" rows="4" placeholder="write about yourself, academic journey, research interests, and teaching experience...">${currentUser.bio || ''}</textarea>
            
                                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">💾 Save Profile Updates</button>
                                </form>
                            </div>
                        </div>

                        <div id="t-gallery" class="tab-content hidden">
                            <h2 class="mb-4">Department Event Gallery</h2>
                            <div class="card mb-4" style="border-left: 4px solid var(--warning);">
                                <h3 style="margin-bottom: 1rem; color: var(--warning);">1. Create New Highlight Category</h3>
                                <form onsubmit="handleCreateHighlight(event)">
                                    <label>Category Name</label>
                                    <input type="text" name="title" placeholder="e.g. Society Connects, Seminars, Farewell" required>
                                    <button type="submit" class="btn btn-primary" style="background: var(--warning); color: #000; font-weight: bold;">➕ Create Category</button>
                                </form>
                            </div>
                            <div class="card" style="border-left: 4px solid var(--success);">
                                <h3 style="margin-bottom: 1rem; color: var(--success);">2. Upload Event Album</h3>
                                <form onsubmit="handleGalleryUpload(event)">
                                    <label>Select Category</label>
                                    <select name="highlightId" id="t-highlight-select" required>
                                        <option value="">Loading categories...</option>
                                    </select>
            
                                    <label>Album Title</label>
                                    <input type="text" name="title" placeholder="e.g. Annual Picnic 2024" required>
            
                                    <label>Caption / Details</label>
                                    <textarea name="caption" rows="3" placeholder="Tell us about this event..." required></textarea>
            
                                    <label style="color: var(--accent);">Select Multiple Photos (Hold Ctrl/Cmd to select many)</label>
                                    <input type="file" name="photos" accept="image/*" multiple required>
                                    <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1rem;">🚀 Publish Album</button>
                                </form>
                            </div>
                        </div>

                        <div id="t-achievement" class="tab-content hidden">
                            <h2 class="mb-4">Post Student Achievement</h2>
                            <div class="card" style="border-left: 4px solid var(--warning);">
                                <form onsubmit="handleAchievement(event)">
                                    <label>Select Feed Category</label>
                                    <select name="category" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text-main); margin-bottom: 1rem;">
                                        <option value="" disabled selected>-- Choose Category --</option>
                                        <option value="academic">📚 Academic Programs & Excellence</option>
                                        <option value="activity">🌟 Student Activities & Achievements</option>
                                    </select>
                                    
                                    <label>Students Involved / Featured</label>
                                    <input type="text" name="studentsInvolved" placeholder="e.g., Rahul, Shibom, and the Quiz Team" required>
                                    
                                    <label>Description / Caption</label>
                                    <textarea name="description" rows="4" placeholder="Share the details of this achievement..." required></textarea>
                                    
                                    <label style="color: var(--accent);">Select Photos (Hold Ctrl/Cmd to select multiple)</label>
                                    <input type="file" name="photos" accept="image/*" multiple required>
                                    
                                    <button type="submit" class="btn" style="background: var(--warning); color: #000; font-weight: bold; width: 100%; margin-top: 1rem;">🚀 Publish Post</button>
                                </form>
                            </div>
                        </div>

                    </section>
                </div>
            `;
            // Initialize anything needed on load

        }

        function renderStudentDash() {
            document.getElementById('app').innerHTML = `
                <div class="dashboard-layout">
                    <aside class="sidebar">
                        <div class="card text-center" style="margin-bottom: 1.5rem;">
                            <div class="faculty-avatar" style="margin: 0 auto 1rem;">🎓</div>
                            <h4 style="margin-bottom: 0.5rem;">${currentUser.name}</h4>
                            <p class="text-sm" style="color: var(--text-dim);">${currentUser.semester}</p>
                            <span style="display:inline-block; margin-top: 0.75rem; background: rgba(16, 185, 129, 0.15); color: var(--success); padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;">Student</span>
                        </div>
                        <nav>
                            <div class="menu-item active" onclick="switchTab('s-overview')">📊 Attendance</div>
                            <div class="menu-item" onclick="switchTab('s-resources')">📥 Downloads</div>
                            <div class="menu-item" onclick="switchTab('s-research')">🔬 Share Research</div>
                            <div class="menu-item" onclick="switchTab('s-gallery'); loadHighlightsDropdown('s-highlight-select');">📸 Event Gallery</div>
                            <div class="menu-item" onclick="switchTab('s-blog')">✍️ Submit Article</div>
                            <div class="menu-item" onclick="switchTab('s-achievement')">🏆 Post Achievement</div>
                        </nav>
                    </aside>
                    <section class="content-area">
                           <div id="s-blog" class="tab-content hidden">
                            <h2 class="mb-4">Submit to Department Journal</h2>
                            <div class="card" style="border-left: 4px solid var(--success);">
                                <p style="color: var(--text-dim); margin-bottom: 1.5rem;">Submit your writing or research. Once a teacher approves it, it will be published on the main public Journal!</p>
                                <form onsubmit="handleBlog(event)">
                                    <label>Article Title</label>
                                    <input type="text" name="title" placeholder="e.g. My Experience at the Science Seminar" required>
                                    
                                    <label style="color: var(--accent);">Cover Image (Optional)</label>
                                    <input type="file" name="image" accept="image/*">
                                    
                                   <label style="color: var(--success);">Upload Manuscript (Word Doc / PDF - Optional)</label>
                               <input type="file" name="document" accept=".doc,.docx,.pdf">
    
                           <div style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
                        <label style="display: block; color: var(--text-main); font-weight: 600; margin-bottom: 0.5rem; font-size: 0.95rem;">
                      📊 SEO Infographic 
                   <span style="color: var(--tartiary); font-size: 0.8rem; font-weight: normal; margin-left: 8px;">(Auto-inserts into the middle of your text)</span>
                            </label>
        
                      <div style="position: relative; border: 2px dashed rgba(0, 136, 255, 0.3); border-radius: 12px; background: rgba(0, 136, 255, 0.02); padding: 2rem 1rem; text-align: center; transition: all 0.3s ease; cursor: pointer; overflow: hidden;" 
                     onmouseover="this.style.borderColor='var(--primary)'; this.style.background='rgba(0, 136, 255, 0.08)'; this.style.boxShadow='0 0 20px rgba(0, 136, 255, 0.15)';" 
                     onmouseout="this.style.borderColor='rgba(0, 136, 255, 0.3)'; this.style.background='rgba(0, 136, 255, 0.02)'; this.style.boxShadow='none';">
                    <input type="file" name="infographic" accept="image/*" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 10;">
                        <div style="pointer-events: none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 0.75rem; filter: drop-shadow(0 0 8px var(--primary-glow));">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p style="color: var(--primary); font-weight: 600; margin-bottom: 0.2rem; font-size: 1.05rem;">Click to upload visual data</p>
                <p style="color: var(--text-dim); font-size: 0.85rem; margin: 0;">Supports JPG, PNG, or WebP</p>
            </div>
        </div>
    </div>
    <label>Content / Summary</label>
    <textarea name="content" rows="6" placeholder="Write your article here..."></textarea>
                                    
                                    <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1rem;">📤 Submit for Review</button>
                                </form>
                            </div>
                        </div>
                        <div id="s-gallery" class="tab-content hidden">
                         <h2 class="mb-4">Upload Event Photos</h2>
                         <div class="card" style="border-left: 4px solid var(--success);">
                         <form onsubmit="handleGalleryUpload(event)">
                             <label>Select Event Category</label>
                              <select name="highlightId" id="s-highlight-select" required>
                                 <option value="">Loading categories...</option>
                                 </select>
            
                            <label>Album Title</label>
                            <input type="text" name="title" placeholder="e.g. Freshers Party 2025" required>
            
                            <label>Caption / Details</label>
                            <textarea name="caption" rows="3" placeholder="Share your memories from this event..." required></textarea>
            
                            <label style="color: var(--accent);">Select Multiple Photos (Hold Ctrl/Cmd to select many)</label>
                            <input type="file" name="photos" accept="image/*" multiple required>
            
                           <button type="submit" class="btn btn-success" style="width: 100%; margin-top: 1rem;">🚀 Publish Album</button>
                          </form>
                        </div>
                       </div>
                        <div id="s-research" class="tab-content hidden">
                            <h2 class="mb-4">Share Your Research</h2>
                            <div class="card">
                                <form onsubmit="handleResearchPost(event)">
                                    <label>Research Title</label>
                                    <input type="text" name="title" placeholder="e.g. My Final Year Physics Project" required>
                                    <label>Caption / Summary</label>
                                    <textarea name="caption" rows="4" placeholder="Talk about your project or upload your paper..." required></textarea>
                                    <label style="color: var(--accent); margin-top: 10px;">Cover Photo (Optional Image)</label>
                                    <input type="file" name="photo" accept="image/*">
                                    <label style="color: var(--success); margin-top: 10px;">Research Document (Optional PDF)</label>
                                    <input type="file" name="document" accept=".pdf,.doc,.docx">
                                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">Publish to Feed</button>
                                </form>
                            </div>
                        </div>
                        <div id="s-overview" class="tab-content">
                            <h2 class="mb-4">Attendance Overview</h2>
                            <div class="grid grid-2">
                                <div class="card text-center">
                                    <div class="card-header" style="justify-content: center;">January 2026</div>
                                    <div class="card-body">
                                        <p style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1; text-shadow: 0 0 10px rgba(0,136,255,0.3);">${currentUser.attendance?.jan?.attended || 0} / ${currentUser.attendance?.jan?.total || 0}</p>
                                        <p style="color: var(--text-dim); font-size: 0.875rem; margin-top: 0.5rem; text-transform: uppercase;">Classes Attended</p>
                                    </div>
                                </div>
                                <div class="card text-center">
                                    <div class="card-header" style="justify-content: center;">February 2026</div>
                                    <div class="card-body">
                                        <p style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1; text-shadow: 0 0 10px rgba(0,136,255,0.3);">${currentUser.attendance?.feb?.attended || 0} / ${currentUser.attendance?.feb?.total || 0}</p>
                                        <p style="color: var(--text-dim); font-size: 0.875rem; margin-top: 0.5rem; text-transform: uppercase;">Classes Attended</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="s-resources" class="tab-content hidden">
                            <h2 class="mb-4">Available Resources</h2>
                            <div class="card">
                                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>Files</span>
                                    <button class="btn btn-sm btn-outline" onclick="loadFiles('student-file-list')">🔄 Refresh</button>
                                </div>
                                <div class="card-body" id="student-file-list">Loading...</div>
                            </div>
                        </div>
                        <div id="s-achievement" class="tab-content hidden">
                            <h2 class="mb-4">Post an Achievement</h2>
                            <div class="card" style="border-left: 4px solid var(--primary);">
                                <form onsubmit="handleAchievement(event)">
                                    <label>Select Feed Category</label>
                                    <select name="category" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text-main); margin-bottom: 1rem;">
                                        <option value="" disabled selected>-- Choose Category --</option>
                                        <option value="academic">📚 Academic Programs & Excellence</option>
                                        <option value="activity">🌟 Student Activities & Achievements</option>
                                    </select>
                                    
                                    <label>Students Involved / Featured</label>
                                    <input type="text" name="studentsInvolved" placeholder="e.g.,name" required>
                                    
                                    <label>Description / Caption</label>
                                    <textarea name="description" rows="4" placeholder="Share the details of this achievement..." required></textarea>
                                    
                                    <label style="color: var(--accent);">Select Photos (Hold Ctrl/Cmd to select multiple)</label>
                                    <input type="file" name="photos" accept="image/*" multiple required>
                                    
                                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">🚀 Publish Post</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            `;
            loadFiles('student-file-list');
        }

        // --- BACKEND LOGIC ---
        async function handleUpload(e, role) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData();
            const type = form.docType ? form.docType.value : 'Resource';

            formData.append('title', form.title.value);
            formData.append('type', type);
            formData.append('uploader', currentUser.name);
            formData.append('role', role);
            formData.append('file', form.querySelector('input[type="file"]').files[0]);
            
            if (form.semester) formData.append('semester', form.semester.value);
            if (form.subject) formData.append('subject', form.subject.value);
            if (form.topic) formData.append('topic', form.topic.value);

            try {
                const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
                if (res.ok) {
                    alert(`✅ Upload Successful! Added to ${type}`);
                    form.reset();
                    // display logic just in case
                    const academicFields = document.getElementById('academic-fields');
                    if(academicFields) academicFields.style.display = 'block';
                    
                    if (role === 'teacher') loadFiles('teacher-file-list');
                } else { alert("❌ Upload Failed"); }
            } catch (err) { alert("⚠️ Server Error - Please check if backend is running"); }
        }
        async function handleNoticePost(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData();
            
            formData.append('title', form.title.value);
            formData.append('content', form.content.value);
            formData.append('author', currentUser.name);
            formData.append('role', currentUser.role);
            
            const fileInput = form.querySelector('input[type="file"]');
            if (fileInput.files.length > 0) {
                formData.append('file', fileInput.files[0]);
            }

            try {
                const res = await fetch(`${API_URL}/notices`, { method: 'POST', body: formData });
                if (res.ok) {
                    alert("📢 Notice Broadcasted Successfully!");
                    form.reset();
                    renderNotices(); 
                    updateNav('notices');
                } else { alert("❌ Failed to post notice."); }
            } catch (err) { alert("Server Error"); }
        }

        async function handleResearchPost(e) {
            e.preventDefault(); 
            const form = e.target;
            const formData = new FormData();
            
            const customAuthor = form.customAuthor ? form.customAuthor.value.trim() : "";
            const finalAuthor = customAuthor !== "" ? customAuthor : currentUser.name;
            const finalRole = form.customRole ? form.customRole.value : currentUser.role;

            formData.append('title', form.title.value);
            formData.append('caption', form.caption.value);
            formData.append('author', finalAuthor); 
            formData.append('role', finalRole); 
            
            const photoInput = form.querySelector('input[name="photo"]');
            if (photoInput && photoInput.files.length > 0) {
                formData.append('photo', photoInput.files[0]);
            }

            const docInput = form.querySelector('input[name="document"]');
            if (docInput && docInput.files.length > 0) {
                formData.append('document', docInput.files[0]);
            }

            try {
                const res = await fetch(`${API_URL}/research-feed`, { method: 'POST', body: formData });
                if (res.ok) {
                    alert("✅ Research Published Successfully!");
                    form.reset(); 
                    navigate('research'); 
                } else { alert("❌ Failed to publish post."); }
            } catch (err) { alert("⚠️ Server Error - Make sure your backend is running."); }
        }

        async function handleBlog(e) {
            if (e) e.preventDefault();
            const form = e.target;
            const formData = new FormData();
            
            formData.append('title', form.title.value);
            formData.append('content', form.content.value || "Please download the attached manuscript to read the full article.");
            formData.append('author', currentUser.name);
            formData.append('role', currentUser.role);
            
            const imgInput = form.querySelector('input[name="image"]');
            if (imgInput && imgInput.files.length > 0) formData.append('image', imgInput.files[0]);
            // 📊 SEO Infographic Upload Logic
             const infoInput = form.querySelector('input[name="infographic"]');
            if (infoInput && infoInput.files.length > 0) formData.append('infographic', infoInput.files[0]);   
            
            const docInput = form.querySelector('input[name="document"]');
            if (docInput && docInput.files.length > 0) formData.append('document', docInput.files[0]);

            try {
                const res = await fetch(`${API_URL}/blogs`, { method: 'POST', body: formData });
                if (res.ok) {
                    if (currentUser.role === 'student') {
                        alert("✅ Article Submitted! It will appear on the portal once a teacher approves it.");
                        form.reset();
                    } else {
                        alert("✅ Blog Published Successfully!");
                        form.reset();
                        navigate('blogs'); 
                    }
                } else { alert("❌ Failed to publish. Check backend console."); }
            } catch (err) { alert("⚠️ Server Error - Is the backend running?"); }
        }

        // --- 📝 BLOG APPROVAL LOGIC ---
        async function loadPendingBlogs() {
            try {
                const res = await fetch(`${API_URL}/blogs/pending`);
                const blogs = await res.json();
                const container = document.getElementById('pending-blogs-list');
                
                if (blogs.length === 0) { 
                    container.innerHTML = "<p style='color: var(--text-dim);'>No articles pending review.</p>"; 
                    return; 
                }

                container.innerHTML = `<table>
                    <thead><tr><th>Title</th><th>Author</th><th>Action</th></tr></thead>
                    <tbody>
                        ${blogs.map(b => `
                            <tr>
                                <td style="color: var(--text-main); font-weight: 500;">${b.title}</td>
                                <td>${b.author}</td>
                                <td style="display: flex; gap: 8px;">
                                    <button onclick="approveBlog('${b._id}')" class="btn btn-sm btn-success" style="padding: 4px 8px;">✅ Approve</button>
                                    <button onclick="deleteItem('${b._id}', 'blogs'); setTimeout(loadPendingBlogs, 500);" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.3); padding: 4px 8px;">Reject & Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`;
            } catch (err) { container.innerHTML = "<p style='color: var(--error);'>Unable to load.</p>"; }
        }

        async function approveBlog(id) {
            try {
                const res = await fetch(`${API_URL}/blogs/approve/${id}`, { method: 'PUT' });
                if (res.ok) {
                    alert("✅ Article Approved and Published to the public Journal!");
                    loadPendingBlogs(); // Refresh the table
                } else { alert("❌ Failed to approve."); }
            } catch (err) { alert("Server Error"); }
        }

       // 🔴 1. Global array to hold files so the search bar works instantly without lagging
       let allResources = []; 

       async function loadFiles(elementId) {
           const container = document.getElementById(elementId);
           container.innerHTML = "<p style='color: var(--text-dim); text-align: center;'>Loading digital library...</p>";
           
           try {
               const userRole = currentUser ? currentUser.role : 'outsider';
               const res = await fetch(`${API_URL}/resources?role=${userRole}`);
               const rawFiles = await res.json();
               
               // Keep ONLY normal resources (banish magazines)
               allResources = rawFiles.filter(f => f.type !== 'Kalavatika' && f.type !== 'Annual');
               
               const isTeacher = currentUser && currentUser.role === 'teacher';
               
               // 🔴 2. Inject the Search Bar and the empty Grid Container
               container.innerHTML = `
                   <div style="margin-bottom: 2rem;">
                       <input type="text" id="resource-search-input" placeholder="🔍 Search files by name, semester, subject, or topic..." 
                              onkeyup="filterResources('${elementId}', ${isTeacher})" 
                              style="width: 100%; padding: 1rem 1.5rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.2); color: var(--text-main); font-size: 1rem; transition: border-color 0.2s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">
                   </div>
                   <div id="resource-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                       </div>
               `;
               
               // Draw the files for the first time
               filterResources(elementId, isTeacher); 
               
           } catch (err) {
               container.innerHTML = "<p style='color: var(--error);'>Unable to load files.</p>";
           }
       }

       // 🔴 3. The logic that draws the sleek cards, shows tags, and handles live searching
       function filterResources(elementId, isTeacher) {
           const query = document.getElementById('resource-search-input').value.toLowerCase();
           const grid = document.getElementById('resource-grid');
           
           // Filter the files based on what the user typed
           const filtered = allResources.filter(f => 
               f.title.toLowerCase().includes(query) || 
               (f.semester && f.semester.toLowerCase().includes(query)) ||
               (f.subject && f.subject.toLowerCase().includes(query)) ||
               (f.topic && f.topic.toLowerCase().includes(query)) ||
               (f.type && f.type.toLowerCase().includes(query))
           );

           if (filtered.length === 0) {
               grid.innerHTML = "<div class='card text-center' style='grid-column: 1 / -1;'><p style='color: var(--text-dim);'>No files match your search.</p></div>";
               return;
           }

           // Draw the modern File Cards
           grid.innerHTML = filtered.map(f => {
               // Generate the little tag pills if the teacher filled them out
               let tagsHtml = '';
               if (f.semester) tagsHtml += `<span style="background: rgba(138, 43, 226, 0.15); color: var(--accent); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; margin-right: 6px; display: inline-block; margin-bottom: 6px; border: 1px solid rgba(138, 43, 226, 0.3);">Sem: ${f.semester}</span>`;
               if (f.subject) tagsHtml += `<span style="background: rgba(0, 136, 255, 0.15); color: var(--primary); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; margin-right: 6px; display: inline-block; margin-bottom: 6px; border: 1px solid rgba(0, 136, 255, 0.3);">${f.subject}</span>`;
               if (f.topic) tagsHtml += `<span style="background: rgba(16, 185, 129, 0.15); color: var(--success); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 6px; border: 1px solid rgba(16, 185, 129, 0.3);">${f.topic}</span>`;
               
               // Fallback tag if no special tags exist
               if (!tagsHtml) tagsHtml = `<span style="background: rgba(0, 136, 255, 0.15); color: var(--accent); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 6px; border: 1px solid rgba(0, 136, 255, 0.3);">${f.type}</span>`;

               return `
               <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.05); border-top: 3px solid var(--primary); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);" onmouseover="this.style.transform='translateY(-6px)'; this.style.borderColor='var(--primary)'; this.style.boxShadow='0 10px 25px rgba(0, 136, 255, 0.15)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='rgba(255,255,255,0.05)'; this.style.boxShadow='none';">
                   
                   ${isTeacher ? `
                   <button onclick="deleteItem('${f._id}', 'resources'); setTimeout(() => loadFiles('${elementId}'), 500);" class="btn btn-sm" style="position: absolute; top: 1rem; right: 1rem; background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239,68,68,0.3); padding: 6px; cursor: pointer; border-radius: 6px; transition: all 0.2s; z-index: 10;" onmouseover="this.style.background='var(--error)'; this.style.color='white';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.color='var(--error)';" title="Delete File">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                   </button>
                   ` : ''}

                   <div>
                       <div style="width: 48px; height: 48px; background: rgba(0, 136, 255, 0.1); border: 1px solid rgba(0, 136, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; color: var(--primary);">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                       </div>
                       <h3 style="color: var(--text-main); font-size: 1.15rem; margin-bottom: 1rem; line-height: 1.4; padding-right: 2rem; font-weight: 600;">${f.title}</h3>
                       
                       <div style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap;">
                           ${tagsHtml}
                       </div>
                   </div>
                   
                   <a href="${f.filePath}" target="_blank" class="btn btn-outline" style="width: 100%; display: inline-flex; justify-content: center; align-items: center; gap: 8px; border-color: rgba(255,255,255,0.1); background: rgba(0,0,0,0.2);">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                       Download Resource
                   </a>
               </div>
               `;
           }).join('');
       }

        async function renderNotices() {
            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 2rem; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.1);">📢 Digital Notice Board</h2>
                <div id="notice-loader" class="text-center" style="color: var(--text-dim);">Loading notices...</div>
                <div id="notice-container" class="grid grid-2 hidden"></div>
            `;
            
            try {
                const res = await fetch(`${API_URL}/notices`);
                const notices = await res.json();
                const container = document.getElementById('notice-container');
                document.getElementById('notice-loader').classList.add('hidden');
                container.classList.remove('hidden');

                if (notices.length === 0) {
                    container.innerHTML = `<div class="card text-center" style="grid-column:1/-1"><p style="color:var(--text-dim);">No active notices at this time.</p></div>`;
                    return;
                }

                const isTeacher = currentUser && currentUser.role === 'teacher';

                container.innerHTML = notices.map(n => `
                    <div class="card" style="border-left: 4px solid var(--accent);">
                        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; border:none; padding-bottom: 0;">
                            <span style="color: var(--text-main); font-size: 1.1rem;">${n.title}</span>
                            ${isTeacher ? `
                            <button onclick="deleteItem('${n._id}', 'notices')" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 8px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='var(--error)'; this.style.color='white';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.color='var(--error)';" title="Delete Notice">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                            ` : ''}
                        </div>
                        <div class="card-body" style="padding-top: 0.5rem;">
                            <p style="font-size: 0.8rem; color: var(--text-tertiary); margin-bottom: 1rem;">
                                Posted by ${n.author} • ${new Date(n.date).toLocaleDateString()}
                            </p>
                            <p style="white-space: pre-wrap; margin-bottom: 1rem; color: var(--text-dim);">${n.content || ''}</p>
                            ${n.filePath ? `<a href="${n.filePath}" target="_blank" class="btn btn-sm btn-outline">📎 View Attachment</a>` : ''}
                        </div>
                    </div>
                `).join('');
            } catch (err) { document.getElementById('notice-loader').innerHTML = "Server Offline"; }
        }

        async function renderBlogs() {
            document.getElementById('app').innerHTML = `
                <div style="max-width: 800px; margin: 0 auto;">
                    <h2 class="text-center" style="margin: 3rem 0 1rem; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.1);">Department Journal</h2>
                    <p class="text-center" style="color: var(--text-dim); margin-bottom: 3rem;">Insights, articles, and updates from the Department of Physics.</p>
                    <div id="blog-loader" class="text-center" style="color: var(--text-dim);">Loading posts...</div>
                    <div id="blog-container" class="hidden"></div>
                </div>
            `;
        
            const container = document.getElementById('blog-container');
            const loader = document.getElementById('blog-loader');
            const isTeacher = currentUser && currentUser.role === 'teacher';
        
            try {
                const res = await fetch(`${API_URL}/blogs`);
                const blogs = await res.json();
                
                loader.classList.add('hidden');
                container.classList.remove('hidden');
        
                if (blogs.length === 0) {
                    container.innerHTML = `<div class="card text-center"><h3 style="color: var(--text-dim);">No Articles Published Yet</h3></div>`;
                    return;
                }
        
                container.innerHTML = blogs.map(b => {
                    // WordPress-style SEO Infographic Block (Fallback)
                    let seoBox = "";
                    if (!b.imagePath && !b.content.includes('<img')) {
                        seoBox = `
                        <figure style='background: rgba(0, 136, 255, 0.05); padding: 2rem; border: 1px dashed rgba(0, 136, 255, 0.3); margin: 2.5rem 0 1rem 0; border-radius: 12px; text-align: center;'>
                            <div style="font-size: 2rem; margin-bottom: 1rem;">📊</div>
                            <h4 style='margin:0 0 0.5rem 0; color:var(--text-main); font-size:1.1rem;'>Infographic Summary for SEO</h4>
                            <figcaption style='margin:0; font-size:0.9rem; color:var(--text-dim); font-style: italic;'>Visual data summary automatically generated.</figcaption>
                        </figure>`;
                    }
        
                    return `
                    <article class="card" style="margin-bottom: 3rem; padding: 3rem; border-top: none; border-left: 5px solid var(--primary); border-radius: 12px; position: relative; overflow: hidden;">
                        
                        ${isTeacher ? `
                        <button onclick="deleteItem('${b._id}', 'blogs')" class="btn btn-sm" style="position: absolute; top: 1.5rem; right: 1.5rem; z-index: 10; background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 8px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='var(--error)'; this.style.color='white';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.color='var(--error)';" title="Delete Article">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        ` : ''}

                        <header style="margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border);">
                            <h1 style="font-size: 2.2rem; font-weight: 800; color: white; line-height: 1.3; margin-bottom: 1.5rem; padding-right: 3rem;">${b.title}</h1>
                            <div style="display: flex; align-items: center; gap: 12px; color: var(--text-dim); font-size: 0.95rem;">
                                <div style="width: 45px; height: 45px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: white; font-weight: bold;">
                                    ${b.author.charAt(0).toUpperCase()}
                                </div>
                                <div style="line-height: 1.4;">
                                    <strong style="color: var(--text-main); font-size: 1.05rem;">${b.author}</strong><br>
                                    ${new Date(b.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </header>

                        ${b.imagePath ? `
                            <div style="margin-bottom: 2rem; border-radius: 8px; overflow: hidden; border: 1px solid var(--border);">
                                <img src="${b.imagePath}" style="width: 100%; max-height: 450px; object-fit: cover;" alt="Blog Cover">
                            </div>
                        ` : ''}
                        
                        <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text-dim); font-family: 'Inter', sans-serif;">
                            ${(() => {
                                if (!b.infographicPath) return `<p style="white-space: pre-wrap; margin: 0;">${b.content}</p>`;
                                const halfway = Math.floor(b.content.length / 2);
                                const splitIndex = b.content.indexOf(' ', halfway);
                                const firstHalf = splitIndex === -1 ? b.content : b.content.substring(0, splitIndex);
                                const secondHalf = splitIndex === -1 ? '' : b.content.substring(splitIndex);

                                return `
                                    <p style="white-space: pre-wrap; margin: 0;">${firstHalf}</p>
                                    
                                    <figure style="margin: 3rem 0; text-align: center; background: rgba(0, 136, 255, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px dashed rgba(0, 136, 255, 0.3);">
                                        <img src="${b.infographicPath.replace(/\\/g, '/')}" alt="Data Infographic for ${b.title}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);">
                                        <figcaption style="color: var(--primary); font-size: 0.95rem; margin-top: 1.2rem; font-weight: 500;">
                                            📊 Visual Data: <span style="color: var(--text-dim); font-weight: normal;">Key insights from this section</span>
                                        </figcaption>
                                    </figure>

                                    <p style="white-space: pre-wrap; margin: 0;">${secondHalf}</p>
                                `;
                            })()}
                        </div>
                        
                        ${seoBox}

                        ${b.documentPath ? `
                            <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05);">
                                <a href="${b.documentPath}" target="_blank" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 8px; color: var(--success); border-color: rgba(16, 185, 129, 0.3);">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14 2 14 8 20 8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    Read Full Manuscript (Word/PDF)
                                </a>
                            </div>
                        ` : ''}
                    </article>
                    `;
                }).join('');
            } catch (err) { 
                if (loader) loader.innerHTML = "<p style='color: var(--error);'>Server Offline or Network Error</p>"; 
                console.error("Failed to render blogs:", err);
            }
        }
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(tabId).classList.remove('hidden');
            document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
        }

        navigate('home');
    
        async function deleteItem(id, type) {
            if (!currentUser || currentUser.role !== 'teacher') {
                alert("⛔ ACCESS DENIED: Only teachers can delete items.");
                return; 
            }
            if (!confirm("⚠️ Are you sure you want to delete this? This cannot be undone.")) return;

            try {
                const res = await fetch(`${API_URL}/${type}/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    alert("✅ Deleted Successfully");
                    if (type === 'resources') {
                        if (document.getElementById('teacher-file-list')) loadFiles('teacher-file-list');
                        if (document.getElementById('resources-list')) loadFiles('resources-list');
                    } else if (type === 'research-feed') {
                        renderResearch();
                    } else if (type === 'notices') {
                        renderNotices();
                    } else if (type === 'events/post') {
                        navigate('gallery'); // 🔴 NEW: Takes you back to the gallery safely
                    } else {
                        renderBlogs();
                    }
                } else { alert("❌ Failed to delete."); }
            } catch (err) { alert("Server Error"); }
        }

        async function loadPendingStudents() {
            try {
                const res = await fetch(`${API_URL}/students/pending`);
                const students = await res.json();
                const container = document.getElementById('pending-list');
                
                if (students.length === 0) { 
                    container.innerHTML = "<p style='color: var(--text-dim);'>No pending approvals.</p>"; 
                    return; 
                }

                container.innerHTML = `<table>
                    <thead><tr><th>Name</th><th>Roll Number</th><th>Action</th></tr></thead>
                    <tbody>
                        ${students.map(s => `
                            <tr>
                                <td style="color: var(--text-main);">${s.name}</td>
                                <td>${s.rollNumber}</td>
                                <td><button onclick="approveStudent('${s._id}')" class="btn btn-sm btn-success">✅ Approve</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`;
            } catch (err) { container.innerHTML = "<p style='color: var(--error);'>Unable to load.</p>"; }
        }

        async function approveStudent(id) {
            try {
                const res = await fetch(`${API_URL}/students/approve/${id}`, { method: 'PUT' });
                if (res.ok) {
                    alert("✅ Student Approved!");
                    loadPendingStudents(); 
                } else { alert("❌ Failed to approve."); }
            } catch (err) { alert("Server Error"); }
        }

        async function renderResearch() {
            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 1rem; font-size: 2.5rem; text-shadow: 0 0 10px rgba(255,255,255,0.1);">🔬 Research Portfolio</h2>
                <p class="text-center" style="color: var(--text-dim); margin-bottom: 3rem;">A live feed of publications, lab work, and innovations from our students and faculty.</p>
                <div id="research-loader" class="text-center" style="color: var(--text-dim);">Loading feed...</div>
                <div id="research-container" style="max-width: 700px; margin: 0 auto;" class="hidden"></div>
            `;

            try {
                const res = await fetch(`${API_URL}/research-feed`);
                const posts = await res.json();
                const container = document.getElementById('research-container');
                document.getElementById('research-loader').classList.add('hidden');
                container.classList.remove('hidden');

                if (posts.length === 0) {
                    container.innerHTML = `<div class="card text-center"><p style="color: var(--text-dim);">No research posted yet. Be the first to share!</p></div>`;
                    return;
                }

                const isTeacher = currentUser && currentUser.role === 'teacher';

                container.innerHTML = posts.map(p => `
                <div class="card" style="margin-bottom: 2rem; padding: 0; overflow: hidden;">
                    <div style="padding: 1.5rem 1.5rem 1rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h3 style="color: var(--text-main); margin-bottom: 0.3rem;">${p.title}</h3>
                            <p style="font-size: 0.85rem; color: var(--text-dim);">
                                <strong style="color: var(--primary);">${p.author}</strong> (${p.role}) • ${new Date(p.date).toLocaleDateString()}
                            </p>
                        </div>
                        ${isTeacher ? `
                        <button onclick="deleteItem('${p._id}', 'research-feed')" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 8px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='var(--error)'; this.style.color='white';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.color='var(--error)';" title="Delete Post">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        ` : ''}
                    </div>
                        ${p.imagePath ? `
                            <div style="width: 100%; background: var(--bg-deep);">
                                <img src="${p.imagePath}" style="width: 100%; max-height: 500px; object-fit: contain; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);" alt="Research Photo">
                            </div>
                        ` : ''}

                        <div style="padding: 1.5rem;">
                            <p style="color: var(--text-dim); line-height: 1.6; white-space: pre-wrap;">${p.caption}</p>
                        </div>

                        ${p.documentPath ? `
                            <div style="padding: 0 1.5rem 1.5rem 1.5rem;">
                                <a href="${p.documentPath}" target="_blank" class="btn btn-outline" style="width: 100%; text-align: center; display: block; color: var(--text-main);">
                                    📄 Read Research Document
                                </a>
                            </div>
                        ` : ''}
                    </div>
                `).join('');
            } catch (err) { 
                document.getElementById('research-loader').innerHTML = "Server Offline"; 
            }
        }

        async function handleProfileUpdate(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData();
            
            if (form.qualifications.value) formData.append('qualifications', form.qualifications.value);
            if (form.bio.value) formData.append('bio', form.bio.value);
            
            const picInput = form.querySelector('input[name="profilePic"]');
            if (picInput.files.length > 0) {
                formData.append('profilePic', picInput.files[0]);
            }

            try {
                // Send update request to the specific teacher's username
                const res = await fetch(`${API_URL}/profile/${currentUser.username}`, {
                    method: 'PUT',
                    body: formData
                });
                
                if (res.ok) {
                    const updatedUser = await res.json();
                    
                    // Update Local Storage so the session remembers the new data!
                    localStorage.setItem('physicaUser', JSON.stringify(updatedUser));
                    currentUser = updatedUser; 
                    
                    alert("✅ Profile Updated Successfully!");
                    navigate('faculty'); // Instantly take them to the Faculty page to see it!
                } else {
                    alert("❌ Failed to update profile.");
                }
            } catch (err) {
                alert("Server Error.");
            }
        }
        async function renderGallery() {
            document.getElementById('app').innerHTML = `
                <h2 class="text-center" style="margin: 3rem 0 1rem; font-size: 2.5rem; color: var(--success);"> Event Highlights</h2>
                <div id="gallery-loader" class="text-center" style="color: var(--success);">Loading categories...</div>
                <div id="gallery-container" class="grid grid-2 hidden"></div>
            `;

            try {
                const res = await fetch(`${API_URL}/events/highlights`);
                const highlights = await res.json();
                const container = document.getElementById('gallery-container');
                document.getElementById('gallery-loader').classList.add('hidden');
                container.classList.remove('hidden');

                if (highlights.length === 0) {
                    container.innerHTML = `<div class="card text-center" style="grid-column:1/-1"><p>No event categories created yet.</p></div>`;
                    return;
                }

                container.innerHTML = highlights.map(h => `
                    <div class="card text-center" onclick="renderHighlightPosts('${h._id}', '${h.title}')" style="cursor: pointer; transition: transform 0.3s; border-top: 4px solid var(--success);">
                        <div style="font-size: 3.5rem; margin-bottom: 1rem;">📁</div>
                        <h3 style="color: white; margin-bottom: 0.5rem; font-size: 1.5rem;">${h.title}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-dim);">Created by ${h.createdBy}</p>
                    </div>
                `).join('');
            } catch (err) { document.getElementById('gallery-loader').innerHTML = "Server Offline"; }
        }
        async function renderHighlightPosts(highlightId, highlightTitle) {
            document.getElementById('app').innerHTML = `
                <div style="margin: 2rem 0; display: flex; justify-content: space-between; align-items: center;">
                    <button class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 6px;" onclick="navigate('gallery')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                   <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back </button>
                    ${currentUser && currentUser.role === 'teacher' ? `
<button class="btn btn-sm" style="background: var(--warning); color: black; font-weight: bold; display: flex; align-items: center; gap: 6px;" onclick="editCategory('${highlightId}', '${highlightTitle}')">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
    Rename </button>` : ''}
                </div>
                <h2 class="text-center" style="margin: 1rem 0 2rem; font-size: 2.5rem; color: var(--success);">${highlightTitle}</h2>
                <div id="posts-loader" class="text-center" style="color: var(--success);">Loading albums...</div>
                
                <div id="posts-container" style="max-width: 600px; margin: 0 auto;" class="hidden"></div>
            `;

            try {
                const res = await fetch(`${API_URL}/events/posts/${highlightId}`);
                const posts = await res.json();
                const container = document.getElementById('posts-container');
                document.getElementById('posts-loader').classList.add('hidden');
                container.classList.remove('hidden');

                if (posts.length === 0) {
                    container.innerHTML = `<div class="card text-center"><p>No photos uploaded to this category yet.</p></div>`;
                    return;
                }

                const isTeacher = currentUser && currentUser.role === 'teacher';

                container.innerHTML = posts.map(p => {
                    // 1. Build the HTML for multiple images WITH A DOWNLOAD BUTTON OVERLAY
                    const imagesHtml = p.imagePaths.map(imgPath => `
                        <div style="position: relative; flex: 0 0 100%; scroll-snap-align: start;">
                            <img src="${imgPath}" style="width: 100%; height: 400px; object-fit: cover;" alt="Event Photo">
                            
                            <a href="${imgPath}" download="Event_Photo" class="btn btn-sm" style="position: absolute; bottom: 15px; right: 15px; background: rgba(0,0,0,0.7); color: white; border: 1px solid rgba(255,255,255,0.3); backdrop-filter: blur(5px); text-decoration: none;">
                                 Download
                            </a>
                        </div>
                    `).join('');

                    return`
                    <div class="card" style="margin-bottom: 2rem; padding: 0; overflow: hidden; border: 1px solid var(--border);">
                        <div style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <h3 style="color: white; margin-bottom: 0.3rem;">${p.title}</h3>
                                <p style="font-size: 0.85rem; color: var(--text-dim);">
                                    <strong style="color: var(--primary);">${p.author}</strong> (${p.role}) • ${new Date(p.date).toLocaleDateString()}
                                </p>
                            </div>
                            ${isTeacher ? `
                            <div style="display: flex; gap: 5px;">
                                <button onclick="editAlbum('${p._id}', '${p.title}', '${p.caption}', '${highlightId}', '${highlightTitle}')" class="btn btn-sm" style="background: rgba(245, 158, 11, 0.1); color: var(--warning); border: 1px solid rgba(245, 158, 11, 0.3); padding: 6px 10px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s;" onmouseover="this.style.background='var(--warning)'; this.style.color='black';" onmouseout="this.style.background='rgba(245, 158, 11, 0.1)'; this.style.color='var(--warning)';" title="Edit">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                     </svg>
                                          </button>
                                <button onclick="deleteItem('${p._id}', 'events/post')" class="btn btn-sm" style="background:var(--error); color: white; padding:6px 10px; display:flex; align-items:center; justify-content:center;" title="Delete Album">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                   <line x1="14" y1="11" x2="14" y2="17"></line>
                                      </svg>
                                     </button>
                            </div>
                            ` : ''}
                        </div>

                        <div style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; background: #000; -webkit-overflow-scrolling: touch;">
                            ${imagesHtml}
                        </div>
                        ${p.imagePaths.length > 1 ? `<p style="text-align:center; font-size:0.8rem; color:var(--text-dim); padding: 8px 0; background: #111; margin:0; border-bottom: 1px solid rgba(255,255,255,0.05);">👈 Swipe to view all ${p.imagePaths.length} photos 👉</p>` : ''}

                        <div style="padding: 1.5rem;">
                            <p style="color: var(--text-main); line-height: 1.6; white-space: pre-wrap;">${p.caption}</p>
                        </div>
                    </div>
                    `;
                }).join('');
            } catch (err) { document.getElementById('posts-loader').innerHTML = "Server Offline"; }
        }
        // ---  GALLERY UPLOAD LOGIC ---

        // 1. Fetch categories to populate the dropdowns
        async function loadHighlightsDropdown(selectId) {
            try {
                const res = await fetch(`${API_URL}/events/highlights`);
                const highlights = await res.json();
                const selectEl = document.getElementById(selectId);
                
                if (highlights.length === 0) {
                    selectEl.innerHTML = '<option value="">No categories available yet.</option>';
                    return;
                }
                
                selectEl.innerHTML = '<option value="" disabled selected>-- Select a Category --</option>' + 
                    highlights.map(h => `<option value="${h._id}">${h.title}</option>`).join('');
            } catch (err) { console.error("Failed to load categories."); }
        }

        // 2. Teacher creating a new Category
        async function handleCreateHighlight(e) {
            e.preventDefault();
            const title = e.target.title.value;
            try {
                const res = await fetch(`${API_URL}/events/highlight`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, role: currentUser.role, author: currentUser.name })
                });
                
                if (res.ok) {
                    alert("✅ New Category Created!");
                    e.target.reset();
                    loadHighlightsDropdown('t-highlight-select'); // Instantly update the dropdown
                } else { alert("❌ Failed to create category. Does it already exist?"); }
            } catch (err) { alert("Server Error"); }
        }

        // 3. Uploading an Album with Multiple Photos
        async function handleGalleryUpload(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData();
            
            formData.append('highlightId', form.highlightId.value);
            formData.append('title', form.title.value);
            formData.append('caption', form.caption.value);
            formData.append('author', currentUser.name);
            formData.append('role', currentUser.role);
            
            // LOOP: Grab ALL selected photos and add them to the package
            const photoInput = form.querySelector('input[name="photos"]');
            for (let i = 0; i < photoInput.files.length; i++) {
                formData.append('photos', photoInput.files[i]);
            }

            try {
                const res = await fetch(`${API_URL}/events/post`, { method: 'POST', body: formData });
                
                if (res.ok) {
                    alert("✅ Album Uploaded Successfully!");
                    form.reset();
                    navigate('gallery'); // Instantly jump to the public gallery to view it!
                } else { alert("❌ Failed to upload album."); }
            } catch (err) { alert("Server Error"); }
        }
        // --- ✏️ RE-EDIT LOGIC ---

        // 1. Rename the Category (e.g., "Picnics" -> "Annual Picnics")
        async function editCategory(categoryId, oldTitle) {
            const newTitle = prompt("Enter new category name:", oldTitle);
            if (!newTitle || newTitle === oldTitle) return; // Cancelled or unchanged

            try {
                const res = await fetch(`${API_URL}/events/highlight/${categoryId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: newTitle })
                });
                
                if (res.ok) {
                    alert("✅ Category Renamed!");
                    navigate('gallery'); // Refresh gallery to see the new name
                } else { alert("❌ Failed to rename."); }
            } catch (err) { alert("Server Error"); }
        }

        // 2. Edit Album Title & Caption
        async function editAlbum(postId, oldTitle, oldCaption, highlightId, highlightTitle) {
            const newTitle = prompt("Edit Album Title:", oldTitle);
            if (!newTitle) return; // Cancelled
            
            const newCaption = prompt("Edit Caption:", oldCaption);
            if (!newCaption) return; // Cancelled

            try {
                const res = await fetch(`${API_URL}/events/post/${postId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: newTitle, caption: newCaption })
                });
                
                if (res.ok) {
                    alert("✅ Album Updated Successfully!");
                    // Refresh the current album page to show changes instantly
                    renderHighlightPosts(highlightId, highlightTitle); 
                } else { alert("❌ Update failed."); }
            } catch (err) { alert("Server Error"); }
        }
    // ---  ACHIEVEMENT FEED ---
    async function openAchievementFeed(category, pageTitle) {
        document.getElementById('app').innerHTML = `
            <div style="max-width: 700px; margin: 0 auto; padding-top: 2rem;">   
                    <button class="btn btn-outline btn-sm mb-4" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 6px 14px; border-radius: 8px; font-weight: 500; transition: all 0.2s;" onclick="renderHome()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                    </button>
                <h2 class="text-center" style="margin-bottom: 2rem; font-size: 2rem; color: var(--text-main);">${pageTitle}</h2>
                <div id="achievement-loader" class="text-center" style="color: var(--text-dim);">Loading portfolio...</div>
                <div id="achievement-container" class="hidden"></div>
            </div>
        `;

        try {
            const res = await fetch(`${API_URL}/achievements/${category}`);
            const posts = await res.json();
            const container = document.getElementById('achievement-container');
            document.getElementById('achievement-loader').classList.add('hidden');
            container.classList.remove('hidden');

            if (posts.length === 0) {
                container.innerHTML = `<div class="card text-center"><p style="color:var(--text-dim);">No posts yet.</p></div>`;
                return;
            }

            const isTeacher = currentUser && currentUser.role === 'teacher';

            container.innerHTML = posts.map(p => {
                // Render multiple images if they exist
                const imagesHtml = p.imagePaths.map(imgPath => `
                    <div style="flex: 0 0 100%; scroll-snap-align: start;">
                        <img src="${imgPath}" style="width: 100%; max-height: 500px; object-fit: contain; background: #000;" alt="Achievement Photo">
                    </div>
                `).join('');

                return `
                <div class="card" style="margin-bottom: 2rem; padding: 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;">
                    
                    <div style="padding: 1.2rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <div style="width: 45px; height: 45px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: white; font-weight: bold;">
                                ${p.author.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 style="color: var(--text-main); font-size: 1.1rem; margin: 0;">${p.author} <span style="font-weight: normal; font-size: 0.85rem; color: var(--text-dim);">(${p.authorRole})</span></h3>
                                <p style="margin: 0; font-size: 0.8rem; color: var(--text-dim);">${new Date(p.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        ${isTeacher || (currentUser && currentUser.name === p.author) ? `
                            <button onclick="deleteItem('${p._id}', 'achievements'); setTimeout(()=>openAchievementFeed('${category}', '${pageTitle}'), 500);" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.1); color: var(--error); border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 8px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='var(--error)'; this.style.color='white';" onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.color='var(--error)';" title="Delete Achievement">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                            ` : ''}</div>

                    <div style="padding: 1rem 1.5rem 0.5rem; background: rgba(0, 136, 255, 0.05);">
                        <span style="font-size: 0.9rem; color: var(--text-main);"><strong>🏆 Featuring:</strong> <span style="color: var(--accent);">${p.studentsInvolved}</span></span>
                    </div>

                    <div style="padding: 1rem 1.5rem 1.5rem;">
                        <p style="color: var(--text-main); line-height: 1.6; margin: 0; white-space: pre-wrap;">${p.description}</p>
                    </div>

                    ${p.imagePaths.length > 0 ? `
                    <div style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; background: #000; border-top: 1px solid rgba(255,255,255,0.05);">
                        ${imagesHtml}
                    </div>
                    ${p.imagePaths.length > 1 ? `<p style="text-align:center; font-size:0.75rem; color:var(--text-dim); padding: 8px 0; background: #111; margin:0;">Swipe to view all ${p.imagePaths.length} photos</p>` : ''}
                    ` : ''}
                </div>
                `;
            }).join('');
        } catch (err) { document.getElementById('achievement-loader').innerHTML = "Server Offline"; }
    }
    // ==========================================
    // 🖼️ TEACHER DASHBOARD: SLIDER MANAGER
    async function uploadCarouselSlide(e) {
        e.preventDefault();
        const title = document.getElementById('carouselTitle').value;
        const imageFile = document.getElementById('carouselImage').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', imageFile);
        formData.append('uploaderName', currentUser.name);

        try {
            // 🔴 CHANGED: Now uses the dynamic API_URL
            const response = await fetch(`${API_URL}/carousel`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('✅ Success! Image is now live on the homepage.');
                document.getElementById('carouselForm').reset(); // 🔴 Fixed!
            } else {
                alert('❌ Failed to upload image.');
            }
        } catch (err) {
            console.error(err);
            alert('⚠️ Server connection error.');
        }
    }

    // ==========================================
    // 📸 DYNAMIC HOMEPAGE SLIDER
    // ==========================================
    // ==========================================
    // 📸 DYNAMIC HOMEPAGE SLIDER (FIXED)
    // ==========================================
    async function loadDynamicSlider() {
        const wrapper = document.getElementById('dynamic-slider-wrapper');
        if (!wrapper) return;

        try {
            const res = await fetch(`${API_URL}/carousel`); 
            const slides = await res.json();

            wrapper.innerHTML = '';

            if (slides.length === 0) {
                wrapper.innerHTML = `<div class="swiper-slide" style="background: #0a0e1a; display: flex; align-items: center; justify-content: center; color: var(--text-dim);">Awaiting Department Highlights...</div>`;
                return;
            }

            // 🔴 Check if the current user is a logged-in Teacher
            const isTeacher = currentUser && currentUser.role === 'teacher';

            slides.forEach(slide => {
                // 🚀 DIRECT CLOUDINARY URL
                const imageUrl = slide.imageUrl; 
                
                wrapper.innerHTML += `
                    <div class="swiper-slide" style="position: relative;">
                        
                        ${isTeacher ? `
                        <button onclick="deleteItem('${slide._id}', 'carousel'); setTimeout(loadDynamicSlider, 500);" style="position: absolute; top: 1.5rem; right: 1.5rem; z-index: 100; width: 42px; height: 42px; border-radius: 50%; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.15); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); color: rgba(255, 255, 255, 0.7);" title="Delete Banner" onmouseover="this.style.background='var(--error)'; this.style.color='white'; this.style.transform='scale(1.1) rotate(5deg)'; this.style.borderColor='transparent'; this.style.boxShadow='0 5px 15px rgba(239, 68, 68, 0.4)';" onmouseout="this.style.background='rgba(0, 0, 0, 0.4)'; this.style.color='rgba(255, 255, 255, 0.7)'; this.style.transform='scale(1) rotate(0deg)'; this.style.borderColor='rgba(255, 255, 255, 0.15)'; this.style.boxShadow='none';">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        ` : ''}

                        <img src="${imageUrl}" alt="Department Highlight" style="width: 100%; height: 100%; object-fit: cover;">
                        
                        <div style="position: absolute; bottom: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.95), transparent); color: white; text-align: center;">
                            <h3 style="margin: 0; font-size: 1.6rem; text-shadow: 0 2px 8px rgba(0,0,0,0.9); color: #ffffff; font-weight: 700; letter-spacing: 0.02em;">${slide.title}</h3>
                        </div>
                    </div>
                `;
            });

            // ✅ Fixed Swiper Initialization
            new Swiper(".heroSwiper", {
                spaceBetween: 0,
                centeredSlides: true,
                effect: "fade", 
                autoplay: { delay: 3500, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });

        } catch (err) {
            console.error("Failed to load dynamic slider:", err);
            wrapper.innerHTML = `<div class="swiper-slide" style="background: #0a0e1a; display: flex; align-items: center; justify-content: center; color: var(--error);">Unable to connect to server.</div>`;
        }
    }
// --- 🏆 ACHIEVEMENT UPLOAD LOGIC ---
async function handleAchievement(e) {
    e.preventDefault(); // Stop page refresh!
    const form = e.target;
    const formData = new FormData();
    
    const category = form.category.value;
    
    // Append all text fields
    formData.append('category', category);
    formData.append('studentsInvolved', form.studentsInvolved.value);
    formData.append('description', form.description.value);
    formData.append('author', currentUser.name);
    formData.append('authorRole', currentUser.role); // Keeps track of who posted it
    
    const photoInput = form.querySelector('input[name="photos"]');
    if (photoInput && photoInput.files.length > 0) {
        for (let i = 0; i < photoInput.files.length; i++) {
            formData.append('photos', photoInput.files[i]);
        }
    } else {
        alert("Please select at least one photo.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/achievements`, { method: 'POST', body: formData });
        
        if (res.ok) {
            alert("✅ Achievement Published Successfully!");
            form.reset();
            const pageTitle = category === 'academic' 
                ? ' Academic Programs & Excellence' 
                : 'Student Activities & Achievements';
            openAchievementFeed(category, pageTitle);
        } else { 
            alert("❌ Failed to publish post. Check backend server."); 
        }
    } catch (err) { 
        alert("⚠️ Server Error - Is the backend running?"); 
    }
}
    // ⏱️ LIVE CLOCK & TRAFFIC LOGIC

         function startSystemStatus() {
        const clockElement = document.getElementById('liveClock');
        if (clockElement) {
            setInterval(() => {
                const now = new Date();
                const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
                const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                
                clockElement.innerHTML = `<span style="color: var(--primary);"></span> ${dateStr} &nbsp;&nbsp;|&nbsp;&nbsp; <span style="color: var(--tartiary);">⏱️</span> <span class="clock-time">${timeStr}</span>`;
            }, 1000); 
        }
        // 2. REAL-TIME WEBSOCKET VISITOR TRACKING
        const visitorElement = document.getElementById('activeVisitors');
        if (visitorElement && typeof io !== 'undefined') {
            const backendUrl = "https://physica-portal-production.up.railway.app";

            const socket = io(backendUrl, {
                transports: ['websocket', 'polling'], 
                secure: true
            });
            
            socket.on('visitorCountUpdate', (realCount) => {
                visitorElement.innerText = realCount;
            });

            socket.on('connect_error', (error) => {
                console.warn("WebSocket Connection Failed:", error.message);
                visitorElement.innerText = "Err"; 
            });
        }
    }
    window.addEventListener('DOMContentLoaded', () => {
        startSystemStatus();
        loadLiveTicker(); 
        initializeTheme();
    }); 
     
    </script>
</body>
</html>
