<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href='//fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>

    <title>{{$subject}}</title>

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

            width: 180px;
            height: 180px;
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
        .labelposition {
            text-align: center right;
            max-width: 50%;
        }
        .valeurposition {
            text-align: center left;
            max-width: 50%;
        }
     

    </style>
</head>

<body>

    <div class="containerNative">
        <div>
            <div class="white_ground">




                <div class="head_logo_large" style="text-align: center">
                                            <img class="logo_large" src="https://wazindo.com/assets/images/wazindotrans.png" alt="">
                                    </div>
                                    <h2 style="text-align: justify;">Vous avez re??u une nouvelle demande de soumission de projet de la part de {{$porteur}}.</h2>

                                    </div>
        </div>
                 
                                    <table>
	
	<tr > 
    <tr >
    <td class="labelposition">
              <strong>Description Projet
			</strong>
          
			</td>
			<td>
				
			</td>
			<td class="valeurposition">
            {{$description_projet}}
			</td>
		
		</tr>
    <tr >
    <td class="labelposition">
     <strong>Type d'Organisation 
			</strong>
          
			</td>
			<td>
				
			</td>
			<td class="valeurposition">
            {{$type_organisation}}
			</td>
         
		</tr>
    <tr >
    <td class="labelposition">
     <strong>Pays 
			</strong>
          
			</td>
			<td>
				
			</td>
			<td class="valeurposition">
            {{$pays}}
			</td>
		</tr>
		<tr >
			<td class="labelposition">
            <strong>D??partement
			</strong>
			</td>
			<td>
			</td>
			<td class="valeurposition">
				{{ $departement }} 
			</td>
		</tr>
		<tr >
			<td class="labelposition">
            
			<strong>
			Commune</strong>
			</td>
			<td>
			</td>
			<td class="valeurposition">
				{{ $commune }}
			</td>
	</tr>
	<tr >
		<td class="labelposition">
        <strong>Cat??gorie
			</strong>
		</td>
		<td>
		</td>
		<td class="valeurposition">
			{{ $categorie }}
		</td>
	</tr>
	<tr >
		<td class="labelposition">
        <strong>Montant ?? Collecter
			</strong>
		</td>
		<td>
		</td>
		<td class="valeurposition">
			{{ $montant_collecter }}
		</td>
	</tr>
	<tr >
		<td class="labelposition">
       <strong> Dur??e de la Campagne
			</strong>
		</td>
		<td>
		</td>
		<td class="valeurposition">
			{{ $duree_campagne }}
		</td>
	</tr>
	<tr >
		<td class="labelposition">
        <strong>Contreparties
			</strong>
		</td>
		<td>
		</td>
		<td class="valeurposition">
			{{ $contrepartie }}
		</td>
	</tr>
	</table>
                          

    
    </div> 


</body>

</html>
