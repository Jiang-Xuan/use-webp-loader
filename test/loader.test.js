import webpack from './helpers/compiler'

describe('Loader', () => {
  test('Defaults', async () => {
    const config = {
      loader: {
        test: /(png|jpg|svg)/,
        options: {}
      }
    }

    const stats = await webpack('fixture.js', config)
    const module = stats.toJson().modules.filter(i => i.id === './hw-os-app@webp.png')
    const { source } = module[0]

    expect(source).toMatchSnapshot()
  })
})
