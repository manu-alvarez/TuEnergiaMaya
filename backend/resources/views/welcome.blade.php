<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TuEnergiaMaya</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Lora:ital@0;1&display=swap"
        rel="stylesheet">
    <style>
        body {
            background-color: #0a0a19;
            color: white;
            font-family: 'Lora', serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }

        .logo {
            width: 100px;
            height: 100px;
            margin-bottom: 2rem;
            filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.8));
            animation: pulse 3s infinite;
        }

        h1 {
            font-family: 'Cinzel', serif;
            font-size: 2.5rem;
            margin: 0;
            color: #fff;
            text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
        }

        p {
            opacity: 0.7;
            margin-top: 1rem;
        }

        @keyframes pulse {

            0%,
            100% {
                transform: scale(1);
                filter: drop-shadow(0 0 15px rgba(0, 200, 255, 0.8));
            }

            50% {
                transform: scale(1.05);
                filter: drop-shadow(0 0 25px rgba(0, 200, 255, 1));
            }
        }
    </style>
</head>

<body>
    <img src="{{ asset('favicon.ico') }}" alt="Logo" class="logo">
    <h1>TuEnergiaMaya</h1>
    <p>API Service Running</p>
</body>

</html>