import axiosAPI from '@/services/common/api';

const IpInfoService = {

  ipInfo: async function() {
      try {
          const response = await axiosAPI.get('https://ipinfo.io/json?token=a594cc6a010751');
          return response.data;
      } catch (error) {
          console.error('Error fetching IP info:', error);
          return null;
      }
  }
  
}

export default IpInfoService;