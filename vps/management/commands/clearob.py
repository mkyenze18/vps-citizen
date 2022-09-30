from django.core.management.base import BaseCommand, CommandError
from vps.models import Occurrence

class Command(BaseCommand):
    help = 'Delect all occurrence book (OB) records'

    def add_arguments(self, parser):
        # parser.add_argument('poll_ids', nargs='+', type=int)

        # Named (optional) arguments
        parser.add_argument('--ob_ids', type=int, nargs='+',
            help='Database id for occurrence resource')

        parser.add_argument(
            '--all',
            action='store_true',
            help='Delete all occurrences',
        )

        parser.add_argument(
            '--yes',
            action='store_true',
            help='Confirm deleting all occurrences',
        )

    def handle(self, *args, **options):
        if options['all']:
            if options['yes']:
                occurrences = Occurrence.objects.all()
                for occurrence in occurrences:
                    for detail in occurrence.details.all():
                        self.stdout.write(self.style.WARNING(f'++ Detail {detail.id} deleted'))
                        detail.delete()

                    for reporter in occurrence.reporters.all():
                        self.stdout.write(self.style.WARNING(f'++ Reporter {reporter.id} deleted'))
                        reporter.delete()

                    for arrest in occurrence.arrests.all():
                        self.stdout.write(self.style.WARNING(f'++ Arrest {arrest.id} deleted'))
                        arrest.delete()

                    self.stdout.write(self.style.NOTICE(f'- {occurrence.id} : {occurrence.ob_no} deleted'))
                    occurrence.delete()
                    
                self.stdout.write(self.style.SUCCESS('Successfully cleared occurrences'))
            else:
                self.stdout.write(self.style.ERROR('You have not confirmed action'))
        else:
            for ob_id in options['ob_ids']:
                try:
                    occurrence = Occurrence.objects.get(pk=ob_id)
                except Occurrence.DoesNotExist:
                    raise CommandError('Occurrence "%s" does not exist' % ob_id)

                for detail in occurrence.details.all():
                    self.stdout.write(self.style.WARNING(f'  ++ Detail {detail.id} deleted'))
                    detail.delete()

                for reporter in occurrence.reporters.all():
                    self.stdout.write(self.style.WARNING(f'  ++ Reporter {reporter.id} deleted'))
                    reporter.delete()

                for reporter in occurrence.unregistered_reporters.all():
                    self.stdout.write(self.style.WARNING(f'  ++ Unregistered reporter {reporter.id} deleted'))
                    reporter.delete()

                self.stdout.write(self.style.NOTICE(f'-- {occurrence.id} : {occurrence.ob_no} deleted'))
                occurrence.delete()

# TODO RESOURCES
# https://docs.djangoproject.com/en/4.1/ref/django-admin/#syntax-coloring