import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from '../../services/authorisation/authorisation.service'

declare var $ : any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private AuthorisationService : AuthorisationService) { 
    

  }



  ngOnInit(): void {
    this.AuthorisationService.getHeader().subscribe(
      (res) => {
        $(document).ready(function() {
          $("#connection").hide()
          $("#inscription").hide()

          $("#dashboard").show()
          $("#disconnection").show()

        })
        
      }, 
      (err) => {
        $(document).ready(function() {
          $("#connection").show()
          $("#inscription").show()

          $("#dashboard").hide()
          $("#disconnection").hide()

        })

      }
    )
  }

  logout(){
    this.AuthorisationService.logout().subscribe(
      result => {
        
      },
      error => {

      }

    )
  }

}
