import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import qs from 'qs'
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { filter, map, mergeMap } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import store from 'store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

import english from './locales/en-US'
import french from './locales/fr-FR'
import russian from './locales/ru-RU'
import chinese from './locales/zh-CN'

const locales = {
  'en-US': english,
  'fr-FR': french,
  'ru-RU': russian,
  'zh-CN': chinese,
}

@Component({
  selector: 'app-root',
  template: `
    <ng-progress></ng-progress>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  _locale: String
  _theme: String

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store<any>,
    translate: TranslateService,
  ) {
    Object.keys(locales).forEach(locale => {
      translate.setTranslation(locale, locales[locale])
    })
    translate.setDefaultLang('en-US')

    // localization && theme listener
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      if (this._locale !== state.locale) {
        translate.use(state.locale)
      }
      if (this._theme !== state.theme) {
        this.setTheme(state.theme)
      }
      this._locale = state.locale
      this._theme = state.theme
    })
  }

  ngOnInit() {
    // set page title from router data variable
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => this.titleService.setTitle('Clean UI Pro Angular | ' + event['title']))

    // listen url query params and set them to ngrx store
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const queryString = event.url.match(/\?(.*)/)
        if (queryString) {
          const queryParams = qs.parse(queryString[1])
          const keys = Object.keys(queryParams)
          if (keys.length) {
            keys.forEach(key => {
              let value
              switch (queryParams[key]) {
                case 'false':
                  value = false
                  break
                case 'true':
                  value = true
                  break
                default:
                  value = queryParams[key]
                  break
              }
              this.store.dispatch(
                new SettingsActions.SetStateAction({
                  [key]: value,
                }),
              )
            })
          }
        }
      })

    // detecting & set mobile/tablet/desktop viewports
    const setViewPort = (isMobileView: any = false, isTabletView: any = false) => {
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          isMobileView,
        }),
      )
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          isTabletView,
        }),
      )
    }
    const detectViewPort = (load = false) => {
      const _isMobileView = window.innerWidth < 768
      const _isTabletView = window.innerWidth < 992
      const _isDesktopView = !_isMobileView && !_isTabletView
      const isMobileView = store.get('app.settings.isMobileView')
      const isTabletView = store.get('app.settings.isTabletView')
      const isDesktopView = !isMobileView && !isTabletView
      if (_isDesktopView && (_isDesktopView !== isDesktopView || load)) {
        setViewPort(false, false)
      }
      if (_isTabletView && !_isMobileView && (_isTabletView !== isTabletView || load)) {
        setViewPort(false, true)
        this.store.dispatch(
          new SettingsActions.SetStateAction({
            isMenuCollapsed: true,
          }),
        )
      }
      if (_isMobileView && (_isMobileView !== isMobileView || load)) {
        setViewPort(true, false)
      }
    }
    detectViewPort(true)
    window.addEventListener('resize', () => {
      detectViewPort()
    })

    // set primary color on app load
    const primaryColor = () => {
      const color = store.get('app.settings.primaryColor')
      if (color) {
        const addStyles = () => {
          const styleElement = document.querySelector('#primaryColor')
          if (styleElement) {
            styleElement.remove()
          }
          const body = document.querySelector('body')
          const styleEl = document.createElement('style')
          const css = document.createTextNode(`:root { --kit-color-primary: ${color};}`)
          styleEl.setAttribute('id', 'primaryColor')
          styleEl.appendChild(css)
          body.appendChild(styleEl)
        }
        addStyles()
        this.store.dispatch(
          new SettingsActions.SetStateAction({
            primaryColor: color,
          }),
        )
      }
    }
    primaryColor()
  }

  setTheme = theme => {
    document.querySelector('html').setAttribute('data-kit-theme', theme)
    if (theme === 'default') {
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          menuColor: 'light',
        }),
      )
    }
    if (theme === 'dark') {
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          menuColor: 'dark',
        }),
      )
    }
  }
}
