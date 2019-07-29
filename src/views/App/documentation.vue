<template>
    <v-container fluid>
        <v-flex xs10 ml-3>
            <h3>FrontEnd Documentation</h3>
            <p>
                The URI to the FrontEnd is <a href="https://www.kolobox.ng">here</a>. 
                It was built with Vue JS, Webpack and Paystack's API. It's hosted on AWS.
                AWS Credentials: <br>
                    <a>username: info@kolobox.ng</a> <br>
                    <a>password: 'kolobox1234!$'</a> <br>
                The Instance with the tag <a>landing kolobox</a> is the frontend instance. To connect to this instance,
                You need the <a>koloboxapikey.pem</a>, The private key. This can be gotten from the Backend Instance or the Jenkins Server.
                The repository for the frontend is <a href="https://gitlab.com/samuelayo/kolobox-webclient">here</a>.
                The repository is private, so you'll ask for permission from the maintainer(samuelayo).
                We are currently on the <a>kolobox_webclient</a> branch, so you'll find the most recent changes there. 
                The <a>staging</a> branch is used to try stuff on staging out first, and its URI is <a href="https://www.fe-staging.kolobox.ng">here</a>
            </p>
            <h3>BackEnd Documentation</h3>
            <p>
                The URI to the BackEnd is <a href="https://api.kolobox.ng">here</a>. The full documentation 
                can be found on the <a>/generate/documentation</a> route. It was built with 
                Node JS, Redis and PostGres.
                The .env file is needed to run this server locally, It can be gotten by connecting to the Instances
                of either the live backend server or the staging backend server.
                Redis needs to be setup to run this server as well. 
                We handle Emails with sendgrid, Get the authentication from the maintainer(Tunde ogundipe).
                It is the instance with no tag on AWS.

                The URI to the Backend staging server is <a href="https://api-staging.kolobox.ng">here</a>
                The Backend and Frontend of the staging environment are hosted together. It has the tag <a>dev server</a>
                on AWS. When you connect to the instance, The <a>Kolonaija</a> folder is for the BackEnd and the <a>Kolobox-webclient</a>
                folder is for the FrontEnd.

                The <a>feature/pgPromise</a> branch is the staging branch on the backend, so you can pull directly to the kolonaija folder
                and then restart the server with pm2.
            </p>
            <h3>Database Documentation</h3>
            <p>
                The database is hosted on AWS as well. We have the test and the live(kolobox_api) servers.
                The credentials for the test and live servers can be gotten from the .env files of both respectively.
            </p>
            <h3>Paystack's Documentation</h3>
            <p>
                Paystack is used to handle payments, We have the staging and the live keys, which we use 
                for the different environments. They can be found in the config folder on the FrontEnd repo.
            </p>
            <h3>Jenkins Documentation</h3>
            <p>
                Jenkins is used to handle the CI/CD. The .env files can also be gotten from here directly.<br>
                <a>url: http://ec2-18-220-113-17.us-east-2.compute.amazonaws.com:8080/login</a><br>
                <a>username: kolobox</a><br/>
                <a>password: Kolobox1234!$</a><br/>
                It has the tag <a>jenkins</a> on AWS. 
            </p>
            <h3>Admin Dashboard</h3>
            <p>
                The Admin dashboard is hosted on the same server with the FrontEnd. 
                The repository is <a href="https://github.com/obbap1/admin-dashboard">here</a>
                Admin dashboard credentials <br>
                    <a>username/email: admin@admin.com</a><br>
                    <a>password: olufemi1</a>
            </p>
        </v-flex>
    </v-container>
</template>
