import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useHistory } from 'react-router-dom'
// import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { REDIRECT_PATH } from '../../utils/routes';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Landing() {
    const history = useHistory();

  return (
    <div class="w-full">
        <div class="flex bg-white" style={{height: "600px"}}>
            <div class="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">Türkiye'nin en kalitelisi <span class="text-indigo-600 font-extrabold">EarthRP</span></h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">Gerçekçi bir dünya ile inanılmaz bir rol yapma oyunun dünyasının atmosferini hissedin </p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <a class="px-4 py-3 bg-indigo-500 text-gray-200 text-xs font-semibold rounded hover:bg-indigo-600" href="https://discord.gg/newworldrp">Discord</a>
                        <div class="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400" onClick={() => history.push(REDIRECT_PATH.LOGIN)}>Giriş Yap</div>
                    </div>
                </div>
            </div>
            <div class="hidden lg:block lg:w-1/2" style={{clipPath: "clip-path:polygon(10% 0, 100% 0%, 100% 100%, 0 100%)"}}>
                <div class="h-full object-cover" style={{backgroundImage: "url(https://media.discordapp.net/attachments/952483010689773569/952486877074706432/bg-1.jpg?width=1073&height=670)"}}>
                    <div class="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    </div>
  )
}
