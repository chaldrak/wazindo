<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href='//fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>

    <title>{{$objet}}</title>

    <style>
        body {


            margin: auto;
            padding: 0;
            width: 100%;
            height: 100%;
            color: #000;

            font-family: 'Lato';
        }

        .containerNative {
            width: 100%;
            background-color: white;
            text-align: center;

            /* display: table-cell;
            vertical-align: top; */
        }

        .post_content {
            text-align: center;
            display: inline-block;
            max-width: 100px;
            max-height: 100px;
        }

        .title {
            font-size: 96px;
            margin-bottom: 40px;
        }

        .quote {
            font-size: 24px;
        }

        ul li {
            list-style-type: none;
        }

        .logo {
max-width:80%;
        }

        .logo_large {


            max-width: 100px;
            max-height: 100px;
            width: 280px;
            height: 280px;

        }

        .head_logo_small {}

        .head_logo_large {

            display: inline-block;
            max-width: 200px;
            max-height: 200px;
            margin: auto;


        }

        .smooke_ground {
            display: inline-block;
            max-width: 90%;
            width: 500px;
            margin-top: 30px;
            margin-bottom: 20px;
            padding-top: 5px;
            background-color: #c0c0c0;
            /* height:1200px; */
            /* width:90%; */
            /* border: 2px solid black; */


        }

        .styled {
    border: 0;
    line-height: 2.5;
    padding: 0 20px;
    font-size: 1rem;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border-radius: 10px;
    background-color: #53B175;
    background-image: linear-gradient(to top left,
                                      rgba(0, 0, 0, .2),
                                      rgba(0, 0, 0, .2) 30%,
                                      rgba(0, 0, 0, 0));
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                inset -2px -2px 3px rgba(0, 0, 0, .6);
}

.styled:hover {
    background-color: #80f0a9;
}

.styled:active {
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                inset 2px 2px 3px rgba(0, 0, 0, .6);
}

        .white_ground {
            display: inline-block;
            margin-top: 10px;
            margin-bottom: 20px;
            padding-top: 30px;
            background-color: #fff;
            width: 95%;
            max-width: 92%;
            /* height:1200px; */
            /* width:90%; */
            /* border: 2px solid black; */
        }

        .contact {
            margin-top: 0px;
            text-align: center;
            margin-bottom: 0px;
        }

        .contact_legend {
            font-size: 10px;
        }

    </style>
</head>

<body>

    <div class="containerNative">
        <div class="smooke_ground">
            <div class="white_ground">


                <div class="post-content">
                <div class="head_logo_large">
                                            <img class="logo" src="https://wazindo.com/assets/images/wazindotrans.png" alt="">
                                    </div>
                  
                     <p style="text-align: justify; padding:10px;">
                     Vous venez d'effectuer une demande de rénitialisation de ton mot de passe, voici les informations: <br>
                    
              
                        </p>
                        <table class="table">
                        <tbody>
                            <tr>
                                <td style='text-align:left; font-weight: bold;'>Email</td>
                                <td style='text-align:right;'>{{$email}}</td>
                            </tr>
                            <tr>
                                <td style='text-align:left; font-weight: bold;'>Login</td>
                                <td style='text-align:right;'>{{$login}}</td>
                            </tr>
                            <tr>
                                <td style='text-align:left; font-weight: bold;'>Nouveau mot de passe</td>
                                <td style='text-align:right;'>{{$mdp}}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        <p class="contact"><a href="mailto:wazindodev@gmail.com">Contactez nous</a> © Wazindo.</p>
    <strong><p class="contact_legend">Pour plus d'informations, envoyez-nous un email à <a href="mailto:wazindodev@gmail.com">mailto:wazindodev@gmail.com</a> </p></strong>

</body>

</html>
