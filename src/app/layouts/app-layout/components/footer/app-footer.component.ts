import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LogoComponent } from "../../../../shared/components/logo-component/logo-component";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent, RouterLink],
})
export class AppFooterComponent {

  socials = ["𝕏", "in", "▶"];
  cols = [
    { title: "Product", items: [["Features", "/"], ["Pricing", "/pricing"], ["Dashboard", "/app"], ["Changelog", "/"]] as [string, string][] },
    { title: "Resources", items: [["Help center", "/"], ["Study guides", "/"], ["Blog", "/"], ["Roadmap", "/"]] as [string, string][] },
    { title: "Company", items: [["About", "/"], ["Careers", "/"], ["Privacy", "/"], ["Terms", "/"]] as [string, string][] },
  ];
}
