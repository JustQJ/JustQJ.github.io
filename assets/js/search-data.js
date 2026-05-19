// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-mask-self-attention",
        
          title: "Mask Self-Attention",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/10/28/mask-attention/";
          
        },
      },{id: "post-python函数查找",
        
          title: "python函数查找",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/08/07/python%E5%87%BD%E6%95%B0%E6%9F%A5%E6%89%BE/";
          
        },
      },{id: "post-transformer学习",
        
          title: "Transformer学习",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/07/31/Transformer%E5%AD%A6%E4%B9%A0/";
          
        },
      },{id: "post-bert学习",
        
          title: "Bert学习",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/07/31/Bert%E5%AD%A6%E4%B9%A0/";
          
        },
      },{id: "post-linux安装torch",
        
          title: "Linux安装Torch",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/07/25/Linux%E5%AE%89%E8%A3%85Torch/";
          
        },
      },{id: "post-in-place-dnn-inference",
        
          title: "in-place-dnn-inference",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/07/13/in-place-dnn-inference/";
          
        },
      },{id: "post-jetsonnx刷机记录",
        
          title: "JetsonNX刷机记录",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/07/02/JetsonNX%E5%88%B7%E6%9C%BA%E8%AE%B0%E5%BD%95/";
          
        },
      },{id: "post-testtags",
        
          title: "testtags",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/06/25/testtags/";
          
        },
      },{id: "post-bayer2rgb",
        
          title: "bayer2rgb",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/06/25/bayer2rgb/";
          
        },
      },{id: "post-linux安装cuda",
        
          title: "Linux安装Cuda",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2023/06/25/Linux%E5%AE%89%E8%A3%85Cuda/";
          
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/JustQJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
