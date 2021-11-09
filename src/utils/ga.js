import ReactGA from 'react-ga'

const TRACKING_ID = 'UA-207149982-2'

export const initGA = () => {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ReactGA.initialize(TRACKING_ID, { debug: isDev })
  console.log('GA init')
}

export const GAPageview = (path) => {
  ReactGA.set({ page: path })
  ReactGA.pageview(path)
  console.log('GA page view')
}

export const GAEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  })
  console.log('GA event')
}
