import express from 'express';
import cors from 'cors';
import dbConn from './database/db-conn';
import MainRoutes from './routes/main-route';


class Server
{
     private App: express.Application;
     private Port: number;
     private Ip: string;
     private StatusDb: boolean= false;

     
     constructor(port=3000, ip='localhost')
     {
          this.App = express();
          this.Port = port;
          this.Ip = ip;

          this.Config();
     }

     private async Config() : Promise<void>
     {
          // settings
          this.App.set('port', this.Port);
          this.App.set('ip', this.Ip);

          this.App.use(express.json());
          this.App.use(express.urlencoded({ extended: true }));
               this.App.use(cors({
                    origin: '*',
                    methods: ['GET', 'POST', 'PUT', 'DELETE'],
                    allowedHeaders: ['Content-Type', 'Authorization'],
                    credentials: true,
               }));

          // database
          await dbConn.sync({ force: false })
          .then(() => {
               console.log('Database connected');
               this.StatusDb = true;
          });


          // routes
          this.App.use('/', MainRoutes.Routes);

          // start server
          if (this.StatusDb) this.Start();
          else console.log('Database not connected');
          

     }

     private Start() : void
     {
          this.App.listen(this.App.get('port'), this.App.get('ip'), () => {
               console.log(`Server running on http://${this.App.get('ip')}:${this.App.get('port')}`);
          })
     }
}

new Server();