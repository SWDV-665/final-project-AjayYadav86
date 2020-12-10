import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-qrshow',
  templateUrl: './qrshow.page.html',
  styleUrls: ['./qrshow.page.scss'],
})
export class QrshowPage implements OnInit {

  qrCodeURL: string;
  constructor(private router: Router,private socialSharing: SocialSharing) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      id: string
    };
    this.qrCodeURL = "http://digitalinfo22.s3-website-us-east-1.amazonaws.com/business/"+state.id ;
  }
  ngOnInit() {
    console.log(this.qrCodeURL);
  }

  sendShare(url) {
    console.log('Calling Social Sharing...')
    this.socialSharing.share("Here is your QR Code", "QR CODE", null, url);
  }

}
