import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
                }}
            >
                {/* <Logo mode="dark" /> */}
                {/* <image src='/img/new-logo.png' className="border-2 border-white" shape="circle"  /> */}
                <img src='/img/new-logo.png' className="border-white" style={{width: '10rem'}}/>
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/thumb-10.jpg"
                        />
                        <Avatar className="border-2 border-white" shape="circle" src="/img/avatars/thumb-11.jpg" />
                        <Avatar className="border-2 border-white" shape="circle" src="/img/avatars/thumb-12.jpg" />
                        <Avatar className="border-2 border-white" shape="circle" src="/img/avatars/thumb-13.jpg" />
                        <div className="text-white">
                            <div className="font-semibold text-base">
                                Our Team
                            </div>
                            {/* <span className="opacity-80">CTO, Onward</span> */}
                        </div>
                    </div>
                    <p className="text-lg text-white opacity-80">
                        Get your Job With Jobee
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
