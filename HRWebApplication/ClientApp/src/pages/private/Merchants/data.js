export const getAllMerchants = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    // delay utility in js: https://stackoverflow.com/a/47480429/9787887
    await delay(Math.random() * 1500 + 150);
    return apiAllMerchants;
};

var apiAllMerchants = [
    {
        id: 1,
        representative: {
            fullName: 'Nguyễn Văn A',
            phone: '0822970079',
            email: 'abc@gmail.com',
        },
        address: {
            province: 'Hồ Chí Minh',
            district: 'Gò Vấp',
            ward: '10',
            street: 'Số 54 đường số 6 City Land',
        },
        loginInfo: {
            email: 'xyz@gmail.com',
            password: '^*(()(&**&*(&*(&',
        },
        social: [
            {
                type: 'website',
                url: 'http://my-brand.com',
            },
            {
                type: 'facebook',
                url: 'http://facebook.com/my-brand',
            },
            {
                type: 'instagram',
                url: 'http://instagram.com/my-brand',
            },
            {
                type: 'youtube',
                url: 'http://youtube.com/my-brand',
            },
            {
                type: 'tiktok',
                url: 'http://tiktok.com/my-brand',
            },
            {
                type: 'custom',
                url: 'http://github.com/my-brand',
            },
        ],
        history: [
            {
                type: 'Yêu cầu tham gia',
                time: '2020-04-03T06:53:58.102Z',
            },
            {
                type: 'Bắt đầu hợp tác',
                time: '2020-05-03T06:53:58.102Z',
            },
            {
                type: 'Ngừng hợp tác',
                time: '2020-06-03T06:53:58.102Z',
            },
            {
                type: 'Yêu cầu tham gia',
                time: '2020-07-03T06:53:58.102Z',
            },
        ],
        acceptStatus: 'PENDING',
        shop: {
            brand: 'My Brand',
            estDate: '03/2015',
            branch: 1,
            businessLicense: true,
            taxNo: '1232139914',
            categories: [
                {
                    name: 'Áo',
                    priceFrom: 300000,
                    priceTo: 500000,
                },
                {
                    name: 'Quần',
                    priceFrom: 500000,
                    priceTo: 1000000,
                },
                {
                    name: 'Giày dép',
                    priceFrom: 400000,
                    priceTo: 800000,
                },
                {
                    name: 'Phụ kiện',
                    priceFrom: 600000,
                    priceTo: 1000000,
                },
            ],
            gender: 0,
            ageFrom: 12,
            ageTo: 60,
            products: [
                'Áo khoác bomber',
                'Áo khoác thể thao',
                'Áo khoác Denim',
                'Áo khoác da/biker',
                'Áo gió',
                'Áo khoác Jumper',
                'Áo Blazer',
                'Quần Denim',
                'Quần ngắn',
                'Quần dài',
                'Quần tây/Slacks',
                'Quần Jogger',
                'Skirt',
                'Leggings',
                'Yếm/Dungarees',
                'QUẦN LÓT',
                'Túi đeo chéo',
            ],
        },
    },
    {
        id: 2,
        representative: {
            fullName: 'Nguyễn Thị B',
            phone: '0123456781',
            email: 'ntb@gmail.com',
        },
        address: {
            province: 'Hồ Chí Minh',
            district: 'Tân Bình',
            ward: '10',
            street: 'Số 54 đường số 6 City Land',
        },
        loginInfo: {
            email: 'ntb@gmail.com',
            password: '^*(()(&**&*(&*(&',
        },
        social: [
            {
                type: 'tiktok',
                url: 'http://tiktok.com/my-brand',
            },
            {
                type: 'custom',
                url: 'http://github.com/my-brand',
            },
        ],
        history: [
            {
                type: 'Yêu cầu tham gia',
                time: '2020-04-03T06:53:58.102Z',
            },
            {
                type: 'Bắt đầu hợp tác',
                time: '2020-05-03T06:53:58.102Z',
            },
        ],
        acceptStatus: 'ACTIVE',
        shop: {
            brand: 'My Brand',
            estDate: '08/2019',
            branch: 4,
            businessLicense: false,
            taxNo: null,
            categories: [
                {
                    name: 'Giày dép',
                    priceFrom: 400000,
                    priceTo: 80000,
                },
                {
                    name: 'Phụ kiện',
                    priceFrom: 600000,
                    priceTo: 1000000,
                },
            ],
            gender: 2,
            ageFrom: 18,
            ageTo: 30,
            products: [
                'Skirt',
                'Leggings',
                'Yếm/Dungarees',
                'QUẦN LÓT',
                'Túi đeo chéo',
                'Túi bao tử',
                'Travel tag',
                'Giày vải bố',
                'Giày thể thao',
                'Giày chạy bộ',
                'Giày bóng rổ',
                'Giày Sandal/Dép',
                'Nón lưỡi trai',
                'Snapback',
            ],
        },
    },
    {
        id: 3,
        representative: {
            fullName: 'Trần Lanh Lợi',
            phone: '0822973333',
            email: 'abc333@gmail.com',
        },
        address: {
            province: 'Hồ Chí Minh',
            district: '1',
            ward: '20',
            street: 'Số 54 đường số 6',
        },
        loginInfo: {
            email: 'xyz123@gmail.com',
            password: '^*(()(&**&*(&*(&',
        },
        social: [
            {
                type: 'website',
                url: 'http://my-brand.com',
            },
            {
                type: 'tiktok',
                url: 'http://tiktok.com/my-brand',
            },
            {
                type: 'custom',
                url: 'http://github.com/my-brand',
            },
        ],
        history: [
            {
                type: 'Yêu cầu tham gia',
                time: '2020-04-03T06:53:58.102Z',
            },
            {
                type: 'Bắt đầu hợp tác',
                time: '2020-05-03T06:53:58.102Z',
            },
            {
                type: 'Ngừng hợp tác',
                time: '2020-06-03T06:53:58.102Z',
            },
        ],
        acceptStatus: 'SUSPENDED',
        shop: {
            brand: 'Brand god',
            estDate: '10/2015',
            branch: 2,
            businessLicense: true,
            taxNo: '1232139914',
            categories: [
                {
                    name: 'Áo',
                    priceFrom: 300000,
                    priceTo: 500000,
                },
                {
                    name: 'Quần',
                    priceFrom: 500000,
                    priceTo: 1000000,
                },
            ],
            gender: 0,
            ageFrom: 12,
            ageTo: 60,
            products: [
                'Áo khoác bomber',
                'Áo khoác thể thao',
                'Áo khoác Denim',
                'Áo khoác da/biker',
                'Áo gió',
                'Áo khoác Jumper',
                'Áo Blazer',
                'Quần Denim',
                'Quần ngắn',
                'Quần dài',
                'Quần tây/Slacks',
                'Quần Jogger',
                'Skirt',
                'Leggings',
                'Yếm/Dungarees',
                'QUẦN LÓT',
                'Túi đeo chéo',
            ],
        },
    },
];
