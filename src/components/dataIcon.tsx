const dataIcon = [
    {
        id: 1,
        name: 'Home',
        svgActive: ` <svg width="25" height="25" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.375 1.16668C29.6638 0.627094 27.7829 0.395844 25.9792 0.395844C22.9729 0.395844 19.7354 1.01251 17.5 2.70834C15.2646 1.01251 12.0271 0.395844 9.02085 0.395844C6.0146 0.395844 2.7771 1.01251 0.541687 2.70834V25.2938C0.541687 25.6792 0.927104 26.0646 1.31252 26.0646C1.46669 26.0646 1.54377 25.9875 1.69794 25.9875C3.77919 24.9854 6.78544 24.2917 9.02085 24.2917C12.0271 24.2917 15.2646 24.9083 17.5 26.6042C19.5813 25.2938 23.3584 24.2917 25.9792 24.2917C28.5229 24.2917 31.1438 24.7542 33.3021 25.9104C33.4563 25.9875 33.5334 25.9875 33.6875 25.9875C34.0729 25.9875 34.4584 25.6021 34.4584 25.2167V2.70834C33.5334 2.01459 32.5313 1.55209 31.375 1.16668ZM31.375 21.9792C29.6792 21.4396 27.8292 21.2083 25.9792 21.2083C23.3584 21.2083 19.5813 22.2104 17.5 23.5208V5.79168C19.5813 4.48126 23.3584 3.47918 25.9792 3.47918C27.8292 3.47918 29.6792 3.71043 31.375 4.25001V21.9792Z" fill="#703EFF" />
                        <path d="M25.9792 9.64584C27.3359 9.64584 28.6463 9.78459 29.8334 10.0467V7.70334C28.6154 7.47209 27.305 7.33334 25.9792 7.33334C23.3584 7.33334 20.9842 7.78043 19.0417 8.61293V11.1721C20.7838 10.1854 23.2042 9.64584 25.9792 9.64584Z" fill="#703EFF" />
                        <path d="M19.0417 12.7138V15.2729C20.7838 14.2863 23.2042 13.7467 25.9792 13.7467C27.3359 13.7467 28.6463 13.8854 29.8334 14.1475V11.8042C28.6154 11.5729 27.305 11.4342 25.9792 11.4342C23.3584 11.4342 20.9842 11.8967 19.0417 12.7138Z" fill="#703EFF" />
                        <path d="M25.9792 15.5504C23.3584 15.5504 20.9842 15.9975 19.0417 16.83V19.3892C20.7838 18.4025 23.2042 17.8629 25.9792 17.8629C27.3359 17.8629 28.6463 18.0017 29.8334 18.2638V15.9204C28.6154 15.6738 27.305 15.5504 25.9792 15.5504Z" fill="#703EFF" />
                    </svg>`,
        svg: ` <svg width="25" height="25" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.375 1.16668C29.6637 0.627094 27.7829 0.395844 25.9791 0.395844C22.9729 0.395844 19.7354 1.01251 17.5 2.70834C15.2645 1.01251 12.027 0.395844 9.02079 0.395844C6.01454 0.395844 2.77704 1.01251 0.541626 2.70834V25.2938C0.541626 25.6792 0.927043 26.0646 1.31246 26.0646C1.46663 26.0646 1.54371 25.9875 1.69788 25.9875C3.77913 24.9854 6.78538 24.2917 9.02079 24.2917C12.027 24.2917 15.2645 24.9083 17.5 26.6042C19.5812 25.2938 23.3583 24.2917 25.9791 24.2917C28.5229 24.2917 31.1437 24.7542 33.302 25.9104C33.4562 25.9875 33.5333 25.9875 33.6875 25.9875C34.0729 25.9875 34.4583 25.6021 34.4583 25.2167V2.70834C33.5333 2.01459 32.5312 1.55209 31.375 1.16668ZM31.375 21.9792C29.6791 21.4396 27.8291 21.2083 25.9791 21.2083C23.3583 21.2083 19.5812 22.2104 17.5 23.5208V5.79168C19.5812 4.48126 23.3583 3.47918 25.9791 3.47918C27.8291 3.47918 29.6791 3.71043 31.375 4.25001V21.9792Z" fill="#A2A2A2"/>
            <path d="M25.9791 9.64584C27.3358 9.64584 28.6462 9.78459 29.8333 10.0467V7.70334C28.6154 7.47209 27.305 7.33334 25.9791 7.33334C23.3583 7.33334 20.9841 7.78043 19.0416 8.61293V11.1721C20.7837 10.1854 23.2041 9.64584 25.9791 9.64584Z" fill="#A2A2A2"/>
            <path d="M19.0416 12.7138V15.2729C20.7837 14.2863 23.2041 13.7467 25.9791 13.7467C27.3358 13.7467 28.6462 13.8854 29.8333 14.1475V11.8042C28.6154 11.5729 27.305 11.4342 25.9791 11.4342C23.3583 11.4342 20.9841 11.8967 19.0416 12.7138Z" fill="#A2A2A2"/>
            <path d="M25.9791 15.5504C23.3583 15.5504 20.9841 15.9975 19.0416 16.83V19.3892C20.7837 18.4025 23.2041 17.8629 25.9791 17.8629C27.3358 17.8629 28.6462 18.0017 29.8333 18.2638V15.9204C28.6154 15.6738 27.305 15.5504 25.9791 15.5504Z" fill="#A2A2A2"/>
            </svg>
            `,
        href: 'home'
    },
    {
        id: 2,
        name: 'Chat',
        svgActive: `<svg width="25" height="25" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.83333 3.16668H28.5V21.6667H5.63708L3.83333 23.4704V3.16668ZM3.83333 0.0833435C2.1375 0.0833435 0.765417 1.47084 0.765417 3.16668L0.75 30.9167L6.91667 24.75H28.5C30.1958 24.75 31.5833 23.3625 31.5833 21.6667V3.16668C31.5833 1.47084 30.1958 0.0833435 28.5 0.0833435H3.83333ZM6.91667 15.5H19.25V18.5833H6.91667V15.5ZM6.91667 10.875H25.4167V13.9583H6.91667V10.875ZM6.91667 6.25001H25.4167V9.33334H6.91667V6.25001Z" fill="#703EFF"/>
                    </svg>

                    `,
        svg: ` <svg width="25" height="25" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.83333 3.16666H28.5V21.6667H5.63708L3.83333 23.4704V3.16666ZM3.83333 0.0833282C2.1375 0.0833282 0.765417 1.47083 0.765417 3.16666L0.75 30.9167L6.91667 24.75H28.5C30.1958 24.75 31.5833 23.3625 31.5833 21.6667V3.16666C31.5833 1.47083 30.1958 0.0833282 28.5 0.0833282H3.83333ZM6.91667 15.5H19.25V18.5833H6.91667V15.5ZM6.91667 10.875H25.4167V13.9583H6.91667V10.875ZM6.91667 6.25H25.4167V9.33333H6.91667V6.25Z" fill="#A2A2A2"/>
                </svg>

                    `,
        href: 'chat'
    },
    {
        id: 3,
        name: 'Read',
        svgActive: ` <svg width="25" height="25" viewBox="0 0 31 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.83325 30.2353C2.83325 28.546 4.23012 27.1765 5.95325 27.1765H28.8333V28.2941C28.8333 31.0556 26.5947 33.2941 23.8333 33.2941H5.95325C4.23012 33.2941 2.83325 31.9246 2.83325 30.2353ZM2.83325 30.2353V7.7059C2.83325 4.94447 5.07183 2.7059 7.83325 2.7059H23.8333C26.5947 2.7059 28.8333 4.94448 28.8333 7.7059V27.1645M10.6333 18H21.0333M9.33325 12.902H22.3332" stroke="#703EFF" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    `,
        svg: ` <svg width="25" height="25" viewBox="0 0 31 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.83337 30.2353C2.83337 28.546 4.23024 27.1765 5.95337 27.1765H28.8334V28.2941C28.8334 31.0556 26.5948 33.2941 23.8334 33.2941H5.95337C4.23025 33.2941 2.83337 31.9246 2.83337 30.2353ZM2.83337 30.2353V7.7059C2.83337 4.94447 5.07195 2.7059 7.83337 2.7059H23.8334C26.5948 2.7059 28.8334 4.94448 28.8334 7.7059V27.1645M10.6334 18H21.0334M9.33337 12.902H22.3334" stroke="#A2A2A2" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    `,
        href: 'read'
    },
    {
        id: 4,
        name: 'Settings',
        svgActive: `<svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.9579 17.0108C27.0195 16.5175 27.0658 16.0242 27.0658 15.5C27.0658 14.9758 27.0195 14.4825 26.9579 13.9892L30.2108 11.4454C30.5037 11.2142 30.5808 10.7979 30.3958 10.4588L27.3125 5.12459C27.1737 4.87793 26.9116 4.73918 26.6341 4.73918C26.5416 4.73918 26.4491 4.75459 26.372 4.78543L22.5333 6.32709C21.7316 5.71043 20.8683 5.20168 19.9279 4.81626L19.342 0.730844C19.2958 0.360844 18.972 0.0833435 18.5866 0.0833435H12.42C12.0345 0.0833435 11.7108 0.360844 11.6645 0.730844L11.0787 4.81626C10.1383 5.20168 9.27496 5.72584 8.47329 6.32709L4.63454 4.78543C4.54204 4.75459 4.44954 4.73918 4.35704 4.73918C4.09496 4.73918 3.83288 4.87793 3.69413 5.12459L0.610792 10.4588C0.410376 10.7979 0.502876 11.2142 0.795793 11.4454L4.04871 13.9892C3.98704 14.4825 3.94079 14.9913 3.94079 15.5C3.94079 16.0088 3.98704 16.5175 4.04871 17.0108L0.795793 19.5546C0.502876 19.7858 0.425792 20.2021 0.610792 20.5413L3.69413 25.8754C3.83288 26.1221 4.09496 26.2608 4.37246 26.2608C4.46496 26.2608 4.55746 26.2454 4.63454 26.2146L8.47329 24.6729C9.27496 25.2896 10.1383 25.7983 11.0787 26.1838L11.6645 30.2692C11.7108 30.6392 12.0345 30.9167 12.42 30.9167H18.5866C18.972 30.9167 19.2958 30.6392 19.342 30.2692L19.9279 26.1838C20.8683 25.7983 21.7316 25.2742 22.5333 24.6729L26.372 26.2146C26.4645 26.2454 26.557 26.2608 26.6495 26.2608C26.9116 26.2608 27.1737 26.1221 27.3125 25.8754L30.3958 20.5413C30.5808 20.2021 30.5037 19.7858 30.2108 19.5546L26.9579 17.0108ZM23.9054 14.3746C23.967 14.8525 23.9825 15.1763 23.9825 15.5C23.9825 15.8238 23.9516 16.1629 23.9054 16.6254L23.6895 18.3675L25.0616 19.4467L26.7266 20.7417L25.6475 22.6071L23.6895 21.8208L22.0862 21.1733L20.6987 22.2217C20.0358 22.715 19.4037 23.085 18.7716 23.3471L17.1375 24.01L16.8908 25.7521L16.5825 27.8333H14.4241L13.8845 24.01L12.2504 23.3471C11.5875 23.0696 10.9708 22.715 10.3541 22.2525L8.95121 21.1733L7.31704 21.8363L5.35913 22.6225L4.27996 20.7571L5.94496 19.4621L7.31704 18.3829L7.10121 16.6408C7.05496 16.1629 7.02413 15.8083 7.02413 15.5C7.02413 15.1917 7.05496 14.8371 7.10121 14.3746L7.31704 12.6325L5.94496 11.5533L4.27996 10.2583L5.35913 8.39293L7.31704 9.17918L8.92038 9.82668L10.3079 8.77834C10.9708 8.28501 11.6029 7.91501 12.235 7.65293L13.8691 6.99001L14.1158 5.24793L14.4241 3.16668H16.567L17.1066 6.99001L18.7408 7.65293C19.4037 7.93043 20.0204 8.28501 20.637 8.74751L22.04 9.82668L23.6741 9.16376L25.632 8.37751L26.7112 10.2429L25.0616 11.5533L23.6895 12.6325L23.9054 14.3746ZM15.5033 9.33334C12.0962 9.33334 9.33663 12.0929 9.33663 15.5C9.33663 18.9071 12.0962 21.6667 15.5033 21.6667C18.9104 21.6667 21.67 18.9071 21.67 15.5C21.67 12.0929 18.9104 9.33334 15.5033 9.33334ZM15.5033 18.5833C13.8075 18.5833 12.42 17.1958 12.42 15.5C12.42 13.8042 13.8075 12.4167 15.5033 12.4167C17.1991 12.4167 18.5866 13.8042 18.5866 15.5C18.5866 17.1958 17.1991 18.5833 15.5033 18.5833Z" fill="#703EFF"/>
</svg>`,
        svg: ` <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.9579 17.0108C27.0195 16.5175 27.0658 16.0242 27.0658 15.5C27.0658 14.9758 27.0195 14.4825 26.9579 13.9892L30.2108 11.4454C30.5037 11.2142 30.5808 10.7979 30.3958 10.4588L27.3125 5.12459C27.1737 4.87793 26.9116 4.73918 26.6341 4.73918C26.5416 4.73918 26.4491 4.75459 26.372 4.78543L22.5333 6.32709C21.7316 5.71043 20.8683 5.20168 19.9279 4.81626L19.342 0.730844C19.2958 0.360844 18.972 0.0833435 18.5866 0.0833435H12.42C12.0345 0.0833435 11.7108 0.360844 11.6645 0.730844L11.0787 4.81626C10.1383 5.20168 9.27496 5.72584 8.47329 6.32709L4.63454 4.78543C4.54204 4.75459 4.44954 4.73918 4.35704 4.73918C4.09496 4.73918 3.83288 4.87793 3.69413 5.12459L0.610792 10.4588C0.410376 10.7979 0.502876 11.2142 0.795793 11.4454L4.04871 13.9892C3.98704 14.4825 3.94079 14.9913 3.94079 15.5C3.94079 16.0088 3.98704 16.5175 4.04871 17.0108L0.795793 19.5546C0.502876 19.7858 0.425792 20.2021 0.610792 20.5413L3.69413 25.8754C3.83288 26.1221 4.09496 26.2608 4.37246 26.2608C4.46496 26.2608 4.55746 26.2454 4.63454 26.2146L8.47329 24.6729C9.27496 25.2896 10.1383 25.7983 11.0787 26.1838L11.6645 30.2692C11.7108 30.6392 12.0345 30.9167 12.42 30.9167H18.5866C18.972 30.9167 19.2958 30.6392 19.342 30.2692L19.9279 26.1838C20.8683 25.7983 21.7316 25.2742 22.5333 24.6729L26.372 26.2146C26.4645 26.2454 26.557 26.2608 26.6495 26.2608C26.9116 26.2608 27.1737 26.1221 27.3125 25.8754L30.3958 20.5413C30.5808 20.2021 30.5037 19.7858 30.2108 19.5546L26.9579 17.0108ZM23.9054 14.3746C23.967 14.8525 23.9825 15.1763 23.9825 15.5C23.9825 15.8238 23.9516 16.1629 23.9054 16.6254L23.6895 18.3675L25.0616 19.4467L26.7266 20.7417L25.6475 22.6071L23.6895 21.8208L22.0862 21.1733L20.6987 22.2217C20.0358 22.715 19.4037 23.085 18.7716 23.3471L17.1375 24.01L16.8908 25.7521L16.5825 27.8333H14.4241L13.8845 24.01L12.2504 23.3471C11.5875 23.0696 10.9708 22.715 10.3541 22.2525L8.95121 21.1733L7.31704 21.8363L5.35913 22.6225L4.27996 20.7571L5.94496 19.4621L7.31704 18.3829L7.10121 16.6408C7.05496 16.1629 7.02413 15.8083 7.02413 15.5C7.02413 15.1917 7.05496 14.8371 7.10121 14.3746L7.31704 12.6325L5.94496 11.5533L4.27996 10.2583L5.35913 8.39293L7.31704 9.17918L8.92038 9.82668L10.3079 8.77834C10.9708 8.28501 11.6029 7.91501 12.235 7.65293L13.8691 6.99001L14.1158 5.24793L14.4241 3.16668H16.567L17.1066 6.99001L18.7408 7.65293C19.4037 7.93043 20.0204 8.28501 20.637 8.74751L22.04 9.82668L23.6741 9.16376L25.632 8.37751L26.7112 10.2429L25.0616 11.5533L23.6895 12.6325L23.9054 14.3746ZM15.5033 9.33334C12.0962 9.33334 9.33663 12.0929 9.33663 15.5C9.33663 18.9071 12.0962 21.6667 15.5033 21.6667C18.9104 21.6667 21.67 18.9071 21.67 15.5C21.67 12.0929 18.9104 9.33334 15.5033 9.33334ZM15.5033 18.5833C13.8075 18.5833 12.42 17.1958 12.42 15.5C12.42 13.8042 13.8075 12.4167 15.5033 12.4167C17.1991 12.4167 18.5866 13.8042 18.5866 15.5C18.5866 17.1958 17.1991 18.5833 15.5033 18.5833Z" fill="#B4B4B4"/>
</svg>`,
        href: 'settings'
    }
]
export default dataIcon;