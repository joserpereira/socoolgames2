<template>
  <div class="d-flex min-vh-100 bg-light" >
    <!-- Sidebar -->
    <aside class="bg-white border-end p-1">
      <nav class="nav flex-column">
        <RouterLink
          to="/admin/dashboard"
          class="nav-link text-dark d-flex align-items-center mb-2"
          active-class="btn-brand rounded">
          <i class="bi bi-easel2 me-2"></i>
          <div class="d-none d-sm-block">{{ $t("adminDashboard.dashboard") }}</div> 
        </RouterLink>

        <li v-if="data.companies.length === 0">
          <div class="nav-link text-dark d-flex align-items-center mb-1 ">
            <i class="bi bi-0-square me-2 text-warning"></i>
            <div class="d-none d-sm-block text-warning">{{ $t("adminDashboard.noCompany") }}</div>  
          </div>
        </li>
        <li v-for="(company, index) in data.companies" :key="company._id">
          <RouterLink
            :to="'/admin/company/' + company._id"
            class="nav-link text-dark d-flex align-items-center mb-1"
            active-class="btn-brand rounded">
            <i class="bi bi-briefcase me-2 d-none d-sm-block"></i>
            <div class="d-none d-sm-block">{{ company.translations[data.activeLanguage].businessName }}</div>
            <div class="d-block d-sm-none ">
              <i class="bi bi-briefcase me-2"></i>
              <div class="small">#{{ index + 1 }}</div>
            </div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/calendar"
            class="nav-link text-dark d-flex align-items-center mb-2"
            active-class="btn-brand rounded">
            <i class="bi bi-calendar-week me-2"></i>
            <div class="d-none d-sm-block">{{ $t("adminDashboard.calendar") }}</div> 
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/calendar2"
            class="nav-link text-dark d-flex align-items-center mb-2"
            active-class="btn-brand rounded">
            <i class="bi bi-calendar-week me-2"></i>
            <div class="d-none d-sm-block">{{ $t("adminDashboard.calendar") }} 2</div> 
          </RouterLink>
        </li>        
        <li>
          <RouterLink
            to="/admin/integrations"
            class="nav-link text-dark d-flex align-items-center mb-2"
            active-class="btn-brand rounded">
            <i class="bi bi-plug me-2"></i>
            <div class="d-none d-sm-block">{{ $t("adminDashboard.integrations") }}</div>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/users"
            class="nav-link text-dark d-flex align-items-center mb-2"
            active-class="btn-brand rounded">
            <i class="bi bi-people me-2"></i>
            <div class="d-none d-sm-block">{{ $t("adminDashboard.users") }}</div>
          </RouterLink>
        </li>
        <li>
          <div class="border rounded pe-1 pt-2" style="max-width: 280px;">
            <div class="ms-3 d-block d-flex">
              <i role="button" class="bi bi-calendar2-plus text-primary me-2" @click.prevent="data.addCalendar = !data.addCalendar"></i>
              <div class="d-none d-sm-block"><strong>My Calendars</strong></div>
              
            </div>
            <div class="ms-1 d-block d-flex" v-if="data.addCalendar" >
              <input autofocus type="text" v-model="data.newCalendarName" placeholder="calendar name" class="form-control" />
              <button  :disabled="data.newCalendarName.length == 0" title="Add Calendar" class="btn button ms-1 btn-brand" @click="createCalendar">
                <i class="bi bi-floppy"></i>
              </button>
              
            </div>
            <div class="ms-1 d-block my-1" v-if="data.addCalendar" style1="max-width: 280px;">
              <textarea type="text" v-model="data.newCalendarDescription" placeholder="calendar descripton" class="form-control"></textarea>
              <label type="text" v-if="data.errorAddCalendar" class="text-danger mx-1 my-2">{{ data.errorAddCalendar }}</label>
            </div>
            <ul class="list-group mt-2" style="max-width: 300px;">
              <li class="list-group-item border-0" v-for="item in data.calendars" :key="item">
                <span class="d-flex ms-1" :title="item.name">
                  <input type="checkbox" checked="true" />
                  <span class="ms-2 text-truncate d-none d-sm-block"> {{ item.name }}</span></span>
              </li>
            </ul>
          </div>
        </li>
      </nav>
    </aside>
    <!-- Conteúdo principal -->
    <main class="flex-fill p-2">
      <RouterView />
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: "AdminDashboard",
};
</script>
<script setup lang="ts">
import { reactive, computed, watch, onMounted } from "vue";

import companyService from "@/services/company.service";
import store from "@/store";
import { ICompany } from "@/store/interfaces";
import calendarService from "@/services/calendar.service";

const data = reactive({
  companies: [] as ICompany[],
  activeLanguage: "en",
  calendars: [] as string[],
  addCalendar: false as boolean,
  newCalendarName: "" as string,
  newCalendarDescription: "" as string,
  selectedCompanyId: undefined as string | undefined,
  errorAddCalendar: "" as string
});

const user = computed(() => store.state.user.user);
var selectedCompany = computed(() => store.state.company.company);

watch(user, async (newvalue, oldValue) => {
  changedAuthenticatedUser(newvalue?._id);
});

watch(selectedCompany, async (newvalue, oldValue) => {
  if (!data.selectedCompanyId && data.selectedCompanyId !== newvalue?._id && selectedCompany.value?._id !== undefined ) {
    data.selectedCompanyId = newvalue._id;
    getCalendars();
  }
});


onMounted(() => {
  if (data.selectedCompanyId == null && selectedCompany.value?._id !== undefined) { 
   data.selectedCompanyId = selectedCompany.value._id;
   getCalendars();
  }
  // if you refresh the page, this code runs before watch
  changedAuthenticatedUser(user?.value?._id);  
});

const changedAuthenticatedUser = async (userId: string) => {
  try {
    if (userId !== undefined && userId !== "") {
      const companyResult = await companyService.getCompaniesByUser(userId);
      const companies = companyResult.data.data[0].companies;
      if (companies && companies.length > 0) {
        while (data.companies.length > 0) {
          data.companies.pop();
        }
        companies.forEach((company: ICompany) => {
          data.companies.push(company);
        });

        await store.dispatch("setCompany", companies[0]);
      }
    }
  } catch (e) {
    console.log("Error on changed authenticated user");
  }
};

const createCalendar = async () => {
  try
  {
    data.errorAddCalendar = "";
    if ((data.newCalendarName ?? "").length == 0) {
      data.errorAddCalendar = "Please fill calendar name";
      return;
    }

    var item = { item: { name: data.newCalendarName, description: data.newCalendarDescription } }
    
    var result = await calendarService.insertItem(data.selectedCompanyId, item);
    if (result.status == 200 && result?.data?.error === 0) {
      data.addCalendar = false;
      data.newCalendarName = "";
      data.newCalendarDescription = "";      
      data.calendars.push(result.data.data);
    } else {
      data.errorAddCalendar = "Problem adding calendar";  
    }
  }
  catch (error: any) {
    data.errorAddCalendar = error.message;
  }
}

const getCalendars = async () => {
  try
  {
    if (data.selectedCompanyId == undefined)
      return;
    var result = await calendarService.getItems(data.selectedCompanyId);
    if (result.status == 200 && result?.data?.error === 0) {
      result.data.data.forEach((element: any) => {
        data.calendars.push(element);
      });
    } else {
      data.errorAddCalendar = "Problem adding calendar";  
    }
  }
  catch (error: any) {
    data.errorAddCalendar = error.message;
  }
}
defineExpose( { data, createCalendar })

</script>
<style>
.link:hover,
.active {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity)) !important;
}
</style>
