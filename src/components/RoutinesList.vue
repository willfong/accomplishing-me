<template>
  <div>
		<b-table :data="routinesList">
				<template slot-scope="props">
						<b-table-column field="name" label="Routine" width="100">
								{{ props.row.name }}
						</b-table-column>
						<b-table-column field="d1" label="Monday">
								<b-icon :type="{ 'is-success': props.row.d1, 'is-light': !props.row.d1 }" :icon="props.row.d1 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d2" label="Tuesday">
								<b-icon :type="{ 'is-success': props.row.d2, 'is-light': !props.row.d2 }" :icon="props.row.d2 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d3" label="Wednesday">
								<b-icon :type="{ 'is-success': props.row.d3, 'is-light': !props.row.d3 }" :icon="props.row.d3 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d4" label="Thursday">
								<b-icon :type="{ 'is-success': props.row.d4, 'is-light': !props.row.d4 }" :icon="props.row.d4 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d5" label="Friday">
								<b-icon :type="{ 'is-success': props.row.d5, 'is-light': !props.row.d5 }" :icon="props.row.d5 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d6" label="Saturday">
								<b-icon :type="{ 'is-success': props.row.d6, 'is-light': !props.row.d6 }" :icon="props.row.d6 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column field="d0" label="Sunday">
								<b-icon :type="{ 'is-success': props.row.d0, 'is-light': !props.row.d0 }" :icon="props.row.d0 ? 'check-circle-outline' : 'checkbox-blank-circle-outline'"></b-icon>
						</b-table-column>
						<b-table-column>
							<b-button size="is-small"
									icon-left="pencil"
									@click="$emit('edit-routine', props.row.id)">
									Edit
							</b-button>
						</b-table-column>
				</template>
				<template slot="empty">
						<section class="section">
								<div class="content has-text-grey has-text-centered">
										<p>
												<b-icon
														icon="emoticon-sad"
														size="is-large">
												</b-icon>
										</p>
										<p>Nothing here.</p>
								</div>
						</section>
				</template>
		</b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: 'RoutinesList',
	computed: {
		...mapGetters([
		"routinesList",
		]),

	},

}
</script>
